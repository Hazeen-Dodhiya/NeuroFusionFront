"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://neurofusion-iqt7.onrender.com/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      // ❌ USER NOT FOUND
      if (!res.ok) {
        setError(data.message || "User not found");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      setMessage("Reset link sent to your email address");

      setEmail("");

      // ⏳ Redirect after 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 3000);

    } catch (err) {
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="mb-3">Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        {/* EMAIL INPUT */}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* ERROR MESSAGE */}
        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="alert alert-success py-2">
            {message}
          </div>
        )}

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}