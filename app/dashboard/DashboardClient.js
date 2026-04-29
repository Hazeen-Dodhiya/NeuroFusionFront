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
  const [authorized, setAuthorized] = useState(false); // ✅ new

  useEffect(() => {
    const urlToken = params.get("token");

    // ✅ If token comes from URL (OAuth etc.)
    if (urlToken) {
      localStorage.setItem("token", urlToken);
      setAuthorized(true);
      router.replace("/dashboard");
      return;
    }

    const token = localStorage.getItem("token");

    // 🚫 Not logged in → redirect
    if (!token) {
      router.push("/login");
      return;
    }

    // ✅ Authorized
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

      setMessage("✅ MRI uploaded successfully");
      setFile(null);

      // clear file input UI
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // clear previous timeout if exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      setMessage("Upload error");
    } finally {
      setLoading(false);
    }
  };

  // 🚫 Prevent flicker before auth check
  if (!authorized) return null;

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <p>Upload your MRI file 👇</p>

      <input
        type="file"
        className="form-control mb-3"
        ref={fileInputRef}
        accept=".dcm,.nii,.nii.gz,.npz"
        onChange={(e) => {
          const selectedFile = e.target.files[0];

          if (!selectedFile) return;

          const fileName = selectedFile.name.toLowerCase();

          const allowed = [".dcm", ".nii", ".nii.gz", ".npz"];
          const isValid = allowed.some((ext) => fileName.endsWith(ext));

          if (!isValid) {
            setMessage("❌ Only .dcm, .nii, .nii.gz, .npz files are allowed");
            e.target.value = ""; // reset input
            setFile(null);
            return;
          }

          setMessage("");
          setFile(selectedFile);
        }}
      />

      <button
        className="btn btn-success"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload MRI"}
      </button>

      <div className="mt-3">
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}