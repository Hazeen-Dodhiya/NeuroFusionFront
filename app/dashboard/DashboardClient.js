// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function DashboardClient() {
//   const fileInputRef = useRef(null);
//   const timeoutRef = useRef(null);

//   const router = useRouter();
//   const params = useSearchParams();

//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [authorized, setAuthorized] = useState(false); // ✅ new

//   useEffect(() => {
//     const urlToken = params.get("token");

//     // ✅ If token comes from URL (OAuth etc.)
//     if (urlToken) {
//       localStorage.setItem("token", urlToken);
//       setAuthorized(true);
//       router.replace("/dashboard");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     // 🚫 Not logged in → redirect
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     // ✅ Authorized
//     setAuthorized(true);
//   }, [params, router]);

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       const token = localStorage.getItem("token");

//       const formData = new FormData();
//       formData.append("mri", file);

//       const res = await fetch(
//         "https://neurofusion-iqt7.onrender.com/mri/upload",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(data.message || data.error || "Upload failed");
//         return;
//       }

//       setMessage("✅ MRI uploaded successfully");
//       setFile(null);

//       // clear file input UI
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       // clear previous timeout if exists
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       timeoutRef.current = setTimeout(() => {
//         setMessage("");
//       }, 3000);

//     } catch (err) {
//       setMessage("Upload error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🚫 Prevent flicker before auth check
//   if (!authorized) return null;

//   return (
//     <div className="container mt-5">
//       <h1>Dashboard</h1>
//       <p>Upload your MRI file 👇</p>

//       <input
//         type="file"
//         className="form-control mb-3"
//         ref={fileInputRef}
//         accept=".dcm,.nii,.nii.gz,.npz"
//         onChange={(e) => {
//           const selectedFile = e.target.files[0];

//           if (!selectedFile) return;

//           const fileName = selectedFile.name.toLowerCase();

//           const allowed = [".dcm", ".nii", ".nii.gz", ".npz"];
//           const isValid = allowed.some((ext) => fileName.endsWith(ext));

//           if (!isValid) {
//             setMessage("❌ Only .dcm, .nii, .nii.gz, .npz files are allowed");
//             e.target.value = ""; // reset input
//             setFile(null);
//             return;
//           }

//           setMessage("");
//           setFile(selectedFile);
//         }}
//       />

//       <button
//         className="btn btn-success"
//         onClick={handleUpload}
//         disabled={loading}
//       >
//         {loading ? "Uploading..." : "Upload MRI"}
//       </button>

//       <div className="mt-3">
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// }








"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardClient() {
  const fileInputRef = useRef(null);
  const timeoutRef = useRef(null);

  const router = useRouter();
  const params = useSearchParams();

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const urlToken = params.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      setAuthorized(true);
      router.replace("/dashboard");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setAuthorized(true);
  }, [params, router]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("mri", file);

      const res = await fetch(
        "https://neurofusion-iqt7.onrender.com/mri/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Upload failed");
        return;
      }

      setMessage("MRI uploaded successfully ✅");
      setFile(null);

      if (fileInputRef.current) fileInputRef.current.value = "";

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      setMessage("Upload error");
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000, #111, #0d0d0d)",
        paddingTop: "40px",
        paddingBottom: "40px",
        position: "relative",
      }}
    >

      {/* ================= AI SCANNING OVERLAY (NEW) ================= */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "#ffc107",
            textAlign: "center",
          }}
        >
          <div className="scanner"></div>

          <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>
            AI Scanning MRI...
          </h3>

          <p className="text-secondary">
            Analyzing brain patterns using deep learning
          </p>

          <div
            style={{
              width: "200px",
              height: "4px",
              background: "#222",
              marginTop: "20px",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <div className="scan-bar"></div>
          </div>

          <style jsx>{`
            .scanner {
              width: 80px;
              height: 80px;
              border: 4px solid #ffc107;
              border-top: 4px solid transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }

            .scan-bar {
              width: 50%;
              height: 100%;
              background: #ffc107;
              animation: scan 1.2s infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            @keyframes scan {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>
      )}

      {/* ================= ORIGINAL UI (UNCHANGED) ================= */}

      <div className="container" style={{ maxWidth: "700px" }}>

        {/* HEADER CARD */}
        <div
          className="p-4 mb-4 rounded-4 text-center"
          style={{
            backgroundColor: "#111",
            border: "1px solid #2a2a2a",
            boxShadow: "0 0 20px rgba(255,193,7,0.1)",
          }}
        >
          <h2 style={{ color: "#ffc107", fontWeight: "bold" }}>
            Dashboard
          </h2>
          <p className="text-secondary mb-0">
            Upload your MRI file for AI analysis
          </p>
        </div>

        {/* UPLOAD CARD */}
        <div
          className="p-4 rounded-4"
          style={{
            backgroundColor: "#0f0f0f",
            border: "1px solid #2a2a2a",
          }}
        >

          <label className="form-label text-light mb-2">
            Select MRI File
          </label>

          <input
            type="file"
            className="form-control mb-3"
            ref={fileInputRef}
            accept=".dcm,.nii,.nii.gz,.npz"
            style={{
              backgroundColor: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
            }}
            onChange={(e) => {
              const selectedFile = e.target.files[0];

              if (!selectedFile) return;

              const fileName = selectedFile.name.toLowerCase();

              const allowed = [".dcm", ".nii", ".nii.gz", ".npz"];
              const isValid = allowed.some((ext) => fileName.endsWith(ext));

              if (!isValid) {
                setMessage("❌ Only .dcm, .nii, .nii.gz, .npz files allowed");
                e.target.value = "";
                setFile(null);
                return;
              }

              setMessage("");
              setFile(selectedFile);
            }}
          />

          <button
            className="btn w-100 fw-semibold"
            onClick={handleUpload}
            disabled={loading}
            style={{
              backgroundColor: "#ffc107",
              color: "#000",
              border: "none",
              padding: "10px",
            }}
          >
            {loading ? "Uploading..." : "Upload MRI"}
          </button>

          {message && (
            <div
              className="mt-3 p-2 rounded text-center"
              style={{
                backgroundColor: "#1a1a1a",
                color: message.includes("✅") ? "#00ff99" : "#ff4d4d",
                border: "1px solid #333",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}