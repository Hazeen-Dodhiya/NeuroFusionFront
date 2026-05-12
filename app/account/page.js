// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AccountPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load user data on page load
//   useEffect(() => {
//     const user = localStorage.getItem("user");

//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     const parsed = JSON.parse(user);

//     setForm({
//       first_name: parsed.first_name || "",
//       last_name: parsed.last_name || "",
//       email: parsed.email || "",
//       password: "",
//     });
//   }, []);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         "https://neurofusion-iqt7.onrender.com/user/update-profile",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify(form),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(data.message || "Update failed");
//         setLoading(false);
//         return;
//       }

//       // update local storage user
//       localStorage.setItem("user", JSON.stringify(data.user));

//       setMessage("Profile updated successfully ✅");

//       // clear password field
//       setForm({ ...form, password: "" });
//       router.push("/dashboard");

//     } catch (err) {
//       setMessage("Server error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "500px" }}>
//       <h2 className="mb-3">Account Settings</h2>

//       <form onSubmit={handleSubmit}>

//         {/* FIRST NAME */}
//         <input
//           type="text"
//           name="first_name"
//           className="form-control mb-2"
//           placeholder="First Name"
//           value={form.first_name}
//           onChange={handleChange}
//         />

//         {/* LAST NAME */}
//         <input
//           type="text"
//           name="last_name"
//           className="form-control mb-2"
//           placeholder="Last Name"
//           value={form.last_name}
//           onChange={handleChange}
//         />

//         {/* EMAIL */}
//         <input
//           type="email"
//           name="email"
//           className="form-control mb-2"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           name="password"
//           className="form-control mb-2"
//           placeholder="New Password (optional)"
//           value={form.password}
//           onChange={handleChange}
//           minLength={8}
//         />

//         {/* MESSAGE BOX */}
//         {message && (
//           <div className="mb-2 text-danger">
//             {message}
//           </div>
//         )}

//         {/* BUTTON */}
//         <button
//           className="btn btn-primary w-100"
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Profile"}
//         </button>

//       </form>
//     </div>
//   );
// }


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
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // ==============================
  // UPDATE PROFILE
  // ==============================

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
          body: JSON.stringify({
            first_name: form.first_name,
            last_name: form.last_name,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Update failed");
        setLoading(false);
        return;
      }

      // keep original email
      const updatedUser = {
        ...data.user,
        email: form.email,
      };

      // update local storage user
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("Profile updated successfully ✅");

      // clear password field
      setForm({ ...form, password: "" });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1200);

    } catch (err) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  // ==============================
  // DELETE ACCOUNT
  // ==============================

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://neurofusion-iqt7.onrender.com/user/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to delete account");
        setDeleteLoading(false);
        return;
      }

      // clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redirect
      router.push("/");

    } catch (err) {
      setMessage("Server error");

    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #000 0%, #111 50%, #1a1a1a 100%)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "550px" }}
      >

        <div
          className="p-4 p-md-5 rounded-4"
          style={{
            backgroundColor: "#111",
            border: "1px solid #2a2a2a",
            boxShadow: "0 0 25px rgba(255,193,7,0.12)",
          }}
        >

          {/* HEADING */}
          <div className="text-center mb-4">
            <h2
              className="fw-bold"
              style={{ color: "#ffc107" }}
            >
              Account Settings
            </h2>

            <p className="text-secondary small">
              Manage your Neuro Fusion account
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* FIRST NAME */}
            <div className="mb-3">
              <label className="form-label text-light">
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                className="form-control bg-dark text-white border-secondary"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
              />
            </div>

            {/* LAST NAME */}
            <div className="mb-3">
              <label className="form-label text-light">
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label text-light">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                className="form-control bg-secondary text-light border-secondary"
                value={form.email}
                disabled
                readOnly
              />

              <small className="text-secondary">
                Email address cannot be changed
              </small>
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label text-light">
                New Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control bg-dark text-white border-secondary"
                placeholder="New Password (optional)"
                value={form.password}
                onChange={handleChange}
                minLength={8}
              />

              <small className="text-secondary">
                Leave empty if you do not want to change password
              </small>
            </div>

            {/* MESSAGE */}
            {message && (
              <div
                className="mb-3 p-2 rounded text-center"
                style={{
                  backgroundColor: "#1f1f1f",
                  color: "#ffc107",
                  border: "1px solid #333",
                }}
              >
                {message}
              </div>
            )}

            {/* UPDATE BUTTON */}
            <button
              className="btn w-100 fw-semibold py-2"
              disabled={loading}
              style={{
                backgroundColor: "#ffc107",
                color: "#000",
                border: "none",
              }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>

          {/* DIVIDER */}
          <hr
            className="my-4"
            style={{ borderColor: "#333" }}
          />

          {/* DELETE ACCOUNT */}
          <div className="text-center">

            <h5 className="text-danger mb-2">
              Delete Account
            </h5>

            <p className="text-secondary small mb-3">
              This action is permanent and cannot be undone.
            </p>

            <button
              className="btn btn-outline-danger w-100 py-2"
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
            >
              {deleteLoading
                ? "Deleting Account..."
                : "Delete My Account"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}