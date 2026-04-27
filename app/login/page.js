"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");

    } catch (error) {
      setErrorMessage("Server error. Try again later.");
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/user/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage("Google login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");

    } catch (error) {
      setErrorMessage("Google login error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleSubmit}>

        {/* Email */}
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
        />

        {/* ERROR */}
        <div style={{ height: "25px", marginBottom: "10px" }}>
          {errorMessage && (
            <small className="text-danger">{errorMessage}</small>
          )}
        </div>

        {/* LOGIN */}
        <button className="btn btn-primary w-100">
          Login
        </button>

        {/* FORGOT PASSWORD */}
        <div className="text-end mb-3">
          <span
            onClick={() => router.push("/forgot-password")}
            style={{ cursor: "pointer", fontSize: "14px", color: "#0d6efd" }}
          >
            Forgot Password?
          </span>
        </div>

        {/* 🔥 GOOGLE LOGIN (REAL) */}
        <div className="mt-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMessage("Google login failed")}
          />
        </div>

      </form>
    </div>
  );
}