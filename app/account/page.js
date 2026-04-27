"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user data on page load
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(user);

    setForm({
      first_name: parsed.first_name || "",
      last_name: parsed.last_name || "",
      email: parsed.email || "",
      password: "",
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://neurofusion-iqt7.onrender.com/user/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Update failed");
        setLoading(false);
        return;
      }

      // update local storage user
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Profile updated successfully ✅");

      // clear password field
      setForm({ ...form, password: "" });
      router.push("/dashboard");

    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Account Settings</h2>

      <form onSubmit={handleSubmit}>

        {/* FIRST NAME */}
        <input
          type="text"
          name="first_name"
          className="form-control mb-2"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
        />

        {/* LAST NAME */}
        <input
          type="text"
          name="last_name"
          className="form-control mb-2"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="New Password (optional)"
          value={form.password}
          onChange={handleChange}
          minLength={8}
        />

        {/* MESSAGE BOX */}
        {message && (
          <div className="mb-2 text-danger">
            {message}
          </div>
        )}

        {/* BUTTON */}
        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </form>
    </div>
  );
}