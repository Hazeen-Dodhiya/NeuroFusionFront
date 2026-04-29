// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [user, setUser] = useState(null);

//   // Load user from localStorage
//   const loadUser = () => {
//     const storedUser = localStorage.getItem("user");
//     setUser(storedUser ? JSON.parse(storedUser) : null);
//   };

//   // Sync on route change
//   useEffect(() => {
//     loadUser();
//   }, [pathname]);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container-fluid">

//         {/* BRAND */}
//         <a className="navbar-brand" href="/">
//           Brain Fusion
//         </a>

//         {/* LEFT LINKS */}
//         <ul className="navbar-nav me-auto">

//           <li className="nav-item">
//             <a className="nav-link" href="/">Home</a>
//           </li>

//           <li className="nav-item">
//             <a className="nav-link" href="/aboutus">About Us</a>
//           </li>

//           {/* Dashboard only if logged in */}
//           {user && (
//             <li className="nav-item">
//               <a className="nav-link" href="/dashboard">
//                 Dashboard
//               </a>
//             </li>
//           )}
//           {user && (
//             <li className="nav-item">
//               <a className="nav-link" href="/results">
//                 Results
//               </a>
//             </li>
//           )}

//         </ul>

//         {/* RIGHT SIDE */}
//         <div className="d-flex align-items-center gap-3">

//           {user ? (
//             <>
//               {/* USER GREETING */}
//               <span className="text-white">
//                 HI, {user.first_name} 👋
//               </span>

//               {/* PROFILE */}
//               <span
//                 onClick={() => router.push("/account")}
//                 style={{
//                   cursor: "pointer",
//                   fontSize: "22px",
//                   color: "white",
//                 }}
//                 title="Account"
//               >
//                 👤
//               </span>

//               {/* LOGOUT */}
//               <button onClick={handleLogout} className="btn btn-danger">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <a href="/login" className="btn btn-outline-light">
//                 Login
//               </a>
//               <a href="/signup" className="btn btn-warning">
//                 Signup
//               </a>
//             </>
//           )}

//         </div>
//       </div>
//     </nav>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid">

        {/* BRAND */}
        <a className="navbar-brand" href="/">
          Brain Fusion
        </a>

        {/* TOGGLER (MOBILE) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE MENU */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>

          {/* LEFT LINKS */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <a className="nav-link" href="/" onClick={closeMenu}>
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/aboutus" onClick={closeMenu}>
                About Us
              </a>
            </li>

            {user && (
              <li className="nav-item">
                <a className="nav-link" href="/dashboard" onClick={closeMenu}>
                  Dashboard
                </a>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <a className="nav-link" href="/results" onClick={closeMenu}>
                  Results
                </a>
              </li>
            )}

          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2">

            {user ? (
              <>
                <span className="text-white">
                  HI, {user.first_name} 👋
                </span>

                <span
                  onClick={() => {
                    router.push("/account");
                    closeMenu();
                  }}
                  style={{
                    cursor: "pointer",
                    fontSize: "22px",
                    color: "white",
                  }}
                  title="Account"
                >
                  👤
                </span>

                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="btn btn-outline-light btn-sm"
                  onClick={closeMenu}
                >
                  Login
                </a>

                <a
                  href="/signup"
                  className="btn btn-warning btn-sm"
                  onClick={closeMenu}
                >
                  Signup
                </a>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}