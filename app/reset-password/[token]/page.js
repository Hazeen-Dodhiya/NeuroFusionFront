"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("loading"); // loading | valid | invalid
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 VERIFY TOKEN ON PAGE LOAD
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(
          `https://neurofusion-iqt7.onrender.com/user/verify-reset-token/${token}`
        );

        const data = await res.json();

        if (!res.ok || data.message !== "valid_token") {
          setStatus("invalid");

          if (data.message === "token_already_used") {
            setMessage("This link has already been used.");
          } else {
            setMessage("This link is invalid or expired.");
          }

          return;
        }

        setStatus("valid");
      } catch (err) {
        setStatus("invalid");
        setMessage("Something went wrong. Invalid or expired link.");
      }
    };

    if (token) verifyToken();
  }, [token]);

  // 🔐 RESET PASSWORD SUBMIT
  const handleReset = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://neurofusion-iqt7.onrender.com/user/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      setMessage("Password updated successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  // ❌ INVALID TOKEN UI
  if (status === "invalid") {
    return (
      <div className="container mt-5 text-center">
        <h3>❌ Reset Link Invalid</h3>
        <p>{message}</p>

        <button
          className="btn btn-primary"
          onClick={() => router.push("/forgot-password")}
        >
          Request New Link
        </button>
      </div>
    );
  }

  // ⏳ LOADING UI
  if (status === "loading") {
    return (
      <h4 className="text-center mt-5">
        Checking reset link...
      </h4>
    );
  }

  // ✅ RESET FORM UI
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Reset Password</h2>

      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="Enter new password"
          />
        </div>

        {message && (
          <div className="alert alert-info py-2">
            {message}
          </div>
        )}

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}