// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <div>

//       {/* HERO SECTION */}
//       <div className="bg-dark text-white py-5">
//         <div className="container text-center">

//           <h1 className="display-4 fw-bold">
//             Brain Fusion
//           </h1>

//           <p className="lead mt-3">
//             AI-powered Alzheimer’s detection using MRI scans
//           </p>

//           <p className="text-secondary">
//             Upload MRI images and get instant AI-based predictions
//           </p>

//           <div className="mt-4 d-flex justify-content-center gap-3">

//             {/* NOT LOGGED IN */}
//             {!user ? (
//               <>
//                 <button
//                   className="btn btn-warning btn-lg"
//                   onClick={() => router.push("/signup")}
//                 >
//                   Get Started
//                 </button>

//                 <button
//                   className="btn btn-outline-light btn-lg"
//                   onClick={() => router.push("/login")}
//                 >
//                   Login
//                 </button>
//               </>
//             ) : (
//               /* LOGGED IN */
//               <button
//                 className="btn btn-warning btn-lg"
//                 onClick={() => router.push("/dashboard")}
//               >
//                 Go to Dashboard
//               </button>
//             )}

//           </div>

//         </div>
//       </div>

//       {/* PROBLEM SECTION */}
//       <div className="container py-5">
//         <h2 className="text-center mb-4">Why Brain Fusion?</h2>

//         <p className="text-center text-muted">
//           Alzheimer’s disease is one of the most challenging neurological disorders.
//           Early detection is difficult, and traditional diagnosis methods are slow and expensive.
//           Brain Fusion helps assist early detection using AI analysis of MRI scans.
//         </p>
//       </div>

//       {/* HOW IT WORKS */}
//       <div className="bg-light py-5">
//         <div className="container">

//           <h2 className="text-center mb-4">How It Works</h2>

//           <div className="row text-center">

//             <div className="col-md-4">
//               <div className="p-3">
//                 <h4>1. Upload MRI</h4>
//                 <p>Select and upload your brain MRI scan</p>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="p-3">
//                 <h4>2. AI Analysis</h4>
//                 <p>Our model analyzes brain patterns using deep learning</p>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="p-3">
//                 <h4>3. Get Result</h4>
//                 <p>Receive instant prediction results and insights</p>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* FEATURES */}
//       <div className="container py-5">
//         <h2 className="text-center mb-4">Features</h2>

//         <div className="row">

//           <div className="col-md-3 mb-3">
//             <div className="card p-3 text-center">🧠 AI Detection</div>
//           </div>

//           <div className="col-md-3 mb-3">
//             <div className="card p-3 text-center">⚡ Fast Results</div>
//           </div>

//           <div className="col-md-3 mb-3">
//             <div className="card p-3 text-center">🔐 Secure Login</div>
//           </div>

//           <div className="col-md-3 mb-3">
//             <div className="card p-3 text-center">📊 Smart Dashboard</div>
//           </div>

//         </div>
//       </div>

//       {/* FINAL CTA */}
//       <div className="bg-dark text-white py-5 text-center">

//         {!user ? (
//           <>
//             <h2>Ready to analyze your MRI?</h2>
//             <p className="text-secondary">
//               Create an account and start your AI diagnosis journey
//             </p>

//             <button
//               className="btn btn-warning btn-lg mt-3"
//               onClick={() => router.push("/signup")}
//             >
//               Start Now
//             </button>
//           </>
//         ) : (
//           <>
//             <h2>Welcome back 👋</h2>
//             <p className="text-secondary">
//               Continue your AI diagnosis from dashboard
//             </p>

//             <button
//               className="btn btn-warning btn-lg mt-3"
//               onClick={() => router.push("/dashboard")}
//             >
//               Go to Dashboard
//             </button>
//           </>
//         )}

//       </div>

//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="bg-light">

      {/* HERO */}
      <div className="bg-dark text-white py-5 py-md-5 py-4">
        <div className="container text-center px-3">

          <h1 className="display-5 display-md-4 fw-bold">
            Brain Fusion
          </h1>

          <p className="lead mt-3 fs-6 fs-md-5">
            AI-powered Alzheimer’s detection using MRI scans
          </p>

          <p className="text-secondary small px-2 px-md-5">
            Upload MRI images and get instant AI-based predictions
          </p>

          {/* BUTTONS */}
          <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-center">

            {!user ? (
              <>
                <button
                  className="btn btn-warning btn-lg px-4"
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </button>

                <button
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                className="btn btn-warning btn-lg px-4"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </button>
            )}

          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <div className="container py-4 py-md-5 px-3">
        <h2 className="text-center mb-3 mb-md-4 fs-3">
          Why Brain Fusion?
        </h2>

        <p className="text-center text-muted px-2 px-md-5 fs-6">
          Alzheimer’s disease is one of the most challenging neurological disorders.
          Early detection is difficult, and traditional diagnosis methods are slow and expensive.
          Brain Fusion helps assist early detection using AI analysis of MRI scans.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-light py-4 py-md-5">
        <div className="container px-3">

          <h2 className="text-center mb-4 fs-3">
            How It Works
          </h2>

          <div className="row g-3 text-center">

            <div className="col-12 col-md-4">
              <div className="p-3 border rounded bg-white h-100">
                <h5>1. Upload MRI</h5>
                <p className="small mb-0">
                  Select and upload your brain MRI scan
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 border rounded bg-white h-100">
                <h5>2. AI Analysis</h5>
                <p className="small mb-0">
                  Our model analyzes brain patterns using deep learning
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3 border rounded bg-white h-100">
                <h5>3. Get Result</h5>
                <p className="small mb-0">
                  Receive instant prediction results and insights
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-4 py-md-5 px-3">
        <h2 className="text-center mb-4 fs-3">
          Features
        </h2>

        <div className="row g-3">

          <div className="col-6 col-md-3">
            <div className="card text-center p-3 h-100">
              🧠 AI Detection
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-center p-3 h-100">
              ⚡ Fast Results
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-center p-3 h-100">
              🔐 Secure Login
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-center p-3 h-100">
              📊 Smart Dashboard
            </div>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark text-white py-5 text-center px-3">

        {!user ? (
          <>
            <h2 className="fs-3">Ready to analyze your MRI?</h2>
            <p className="text-secondary small">
              Create an account and start your AI diagnosis journey
            </p>

            <button
              className="btn btn-warning btn-lg mt-3 px-4"
              onClick={() => router.push("/signup")}
            >
              Start Now
            </button>
          </>
        ) : (
          <>
            <h2 className="fs-3">Welcome back 👋</h2>
            <p className="text-secondary small">
              Continue your AI diagnosis from dashboard
            </p>

            <button
              className="btn btn-warning btn-lg mt-3 px-4"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </button>
          </>
        )}

      </div>

    </div>
  );
}