"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const router = useRouter();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // NORMAL SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!first_name || !last_name || !email || !password) {
      setMessage("All fields are required");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await fetch("https://neurofusion-iqt7.onrender.com/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      router.push("/login");

    } catch (error) {
      setMessage("Server error. Try again later.");
    }
  };

  // GOOGLE SIGNUP (same backend as login)
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("https://neurofusion-iqt7.onrender.com/user/google-signup", {
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
        setMessage("Google signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");

    } catch (error) {
      setMessage("Google signup error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-2"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* MESSAGE */}
        <div style={{ height: "25px", marginBottom: "10px" }}>
          {message && (
            <small className="text-danger">{message}</small>
          )}
        </div>

        {/* SIGNUP */}
        <button className="btn btn-warning w-100">
          Signup
        </button>

        {/* 🔥 GOOGLE SIGNUP */}
        <div className="mt-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setMessage("Google signup failed")}
          />
        </div>

      </form>
    </div>
  );
}