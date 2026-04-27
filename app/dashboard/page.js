"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const params = useSearchParams();

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 NEW

  useEffect(() => {
    const urlToken = params.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      router.replace("/dashboard");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  // 🔥 HANDLE FILE UPLOAD
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    try {
      setLoading(true); // 🔥 START LOADING
      setMessage("");

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("mri", file);

      const res = await fetch("http://localhost:5000/mri/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        setMessage(data.message || data.error || "Upload failed");
        return;
      }

      setMessage("✅ MRI uploaded successfully");
      setFile(null);

    } catch (err) {
      setMessage("Upload error");
    } finally {
      setLoading(false); // 🔥 STOP LOADING (always runs)
    }
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <p>Upload your MRI file 👇</p>

      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="btn btn-success"
        onClick={handleUpload}
        disabled={loading} // 🔥 disable while uploading
      >
        {loading ? "Uploading..." : "Upload MRI"}
      </button>

      <div className="mt-3">
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}