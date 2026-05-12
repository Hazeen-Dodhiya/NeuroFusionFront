// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   return (
//     <div className="bg-light">

//       {/* HERO */}
//       <div className="bg-dark text-white py-5 py-md-5 py-4">
//         <div className="container text-center px-3">

//           <h1 className="display-5 display-md-4 fw-bold">
//             Neuro Fusion
//           </h1>

//           <p className="lead mt-3 fs-6 fs-md-5">
//             AI-powered Alzheimer’s detection using MRI scans
//           </p>

//           <p className="text-secondary small px-2 px-md-5">
//             Upload MRI images and get instant AI-based predictions
//           </p>

//           {/* BUTTONS */}
//           <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-center">

//             {!user ? (
//               <>
//                 <button
//                   className="btn btn-warning btn-lg px-4"
//                   onClick={() => router.push("/signup")}
//                 >
//                   Get Started
//                 </button>

//                 <button
//                   className="btn btn-outline-light btn-lg px-4"
//                   onClick={() => router.push("/login")}
//                 >
//                   Login
//                 </button>
//               </>
//             ) : (
//               <button
//                 className="btn btn-warning btn-lg px-4"
//                 onClick={() => router.push("/dashboard")}
//               >
//                 Go to Dashboard
//               </button>
//             )}

//           </div>
//         </div>
//       </div>

//       {/* PROBLEM */}
//       <div className="container py-4 py-md-5 px-3">
//         <h2 className="text-center mb-3 mb-md-4 fs-3">
//           Why Neuro Fusion?
//         </h2>

//         <p className="text-center text-muted px-2 px-md-5 fs-6">
//           Alzheimer’s disease is one of the most challenging neurological disorders.
//           Early detection is difficult, and traditional diagnosis methods are slow and expensive.
//           Neuro Fusion helps assist early detection using AI analysis of MRI scans.
//         </p>
//       </div>

//       {/* HOW IT WORKS */}
//       <div className="bg-light py-4 py-md-5">
//         <div className="container px-3">

//           <h2 className="text-center mb-4 fs-3">
//             How It Works
//           </h2>

//           <div className="row g-3 text-center">

//             <div className="col-12 col-md-4">
//               <div className="p-3 border rounded bg-white h-100">
//                 <h5>1. Upload MRI</h5>
//                 <p className="small mb-0">
//                   Select and upload your brain MRI scan
//                 </p>
//               </div>
//             </div>

//             <div className="col-12 col-md-4">
//               <div className="p-3 border rounded bg-white h-100">
//                 <h5>2. AI Analysis</h5>
//                 <p className="small mb-0">
//                   Our model analyzes brain patterns using deep learning
//                 </p>
//               </div>
//             </div>

//             <div className="col-12 col-md-4">
//               <div className="p-3 border rounded bg-white h-100">
//                 <h5>3. Get Result</h5>
//                 <p className="small mb-0">
//                   Receive instant prediction results and insights
//                 </p>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* FEATURES */}
//       <div className="container py-4 py-md-5 px-3">
//         <h2 className="text-center mb-4 fs-3">
//           Features
//         </h2>

//         <div className="row g-3">

//           <div className="col-6 col-md-3">
//             <div className="card text-center p-3 h-100">
//               🧠 AI Detection
//             </div>
//           </div>

//           <div className="col-6 col-md-3">
//             <div className="card text-center p-3 h-100">
//               ⚡ Fast Results
//             </div>
//           </div>

//           <div className="col-6 col-md-3">
//             <div className="card text-center p-3 h-100">
//               🔐 Secure Login
//             </div>
//           </div>

//           <div className="col-6 col-md-3">
//             <div className="card text-center p-3 h-100">
//               📊 Smart Dashboard
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* CTA */}
//       <div className="bg-dark text-white py-5 text-center px-3">

//         {!user ? (
//           <>
//             <h2 className="fs-3">Ready to analyze your MRI?</h2>
//             <p className="text-secondary small">
//               Create an account and start your AI diagnosis journey
//             </p>

//             <button
//               className="btn btn-warning btn-lg mt-3 px-4"
//               onClick={() => router.push("/signup")}
//             >
//               Start Now
//             </button>
//           </>
//         ) : (
//           <>
//             <h2 className="fs-3">Welcome back 👋</h2>
//             <p className="text-secondary small">
//               Continue your AI diagnosis from dashboard
//             </p>

//             <button
//               className="btn btn-warning btn-lg mt-3 px-4"
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
      <div
        className="bg-dark text-white py-5 py-md-5 py-4"
        style={{
          background:
            "linear-gradient(135deg, #000 0%, #111 50%, #1a1a1a 100%)",
        }}
      >
        <div className="container text-center px-3">

          <h1
            className="display-5 display-md-4 fw-bold"
            style={{ color: "#ffc107" }}
          >
            Neuro Fusion
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
                  className="btn btn-warning btn-lg px-4 fw-semibold"
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
                className="btn btn-warning btn-lg px-4 fw-semibold"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </button>
            )}

          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <div className="container py-5 px-3">
        <h2
          className="text-center mb-4 fw-bold fs-3"
          style={{ color: "#111" }}
        >
          Why Neuro Fusion?
        </h2>

        <div className="row align-items-center g-4">

          <div className="col-lg-6">
            <p className="text-muted fs-6" style={{ lineHeight: "1.9" }}>
              Alzheimer’s disease is one of the most challenging neurological
              disorders affecting millions of people worldwide. Detecting the
              disease at an early stage is extremely important, but traditional
              diagnosis methods can often be slow, expensive, and difficult to
              access.
            </p>

            <p className="text-muted fs-6" style={{ lineHeight: "1.9" }}>
              Neuro Fusion uses Artificial Intelligence and Deep Learning to
              assist in the analysis of brain MRI scans. Our platform helps
              identify patterns linked with Alzheimer’s disease quickly and
              efficiently, supporting earlier medical attention and better
              decision-making.
            </p>

            <p className="text-muted fs-6" style={{ lineHeight: "1.9" }}>
              By combining modern AI technologies with medical imaging, Neuro
              Fusion aims to reduce diagnosis delays and make AI-assisted
              healthcare more accessible for everyone.
            </p>
          </div>

          <div className="col-lg-6">
            <div
              className="p-4 rounded-4"
              style={{
                backgroundColor: "#111",
                color: "#fff",
                border: "1px solid #2b2b2b",
                boxShadow: "0 0 20px rgba(255,193,7,0.1)",
              }}
            >
              <h4
                className="fw-bold mb-4"
                style={{ color: "#ffc107" }}
              >
                Problems We Solve
              </h4>

              <div className="mb-3">
                <h6>⏳ Slow Diagnosis Process</h6>
                <p className="text-secondary small mb-0">
                  Traditional analysis can take significant time before results
                  are available.
                </p>
              </div>

              <div className="mb-3">
                <h6>💰 Expensive Medical Procedures</h6>
                <p className="text-secondary small mb-0">
                  AI assistance helps support faster preliminary analysis.
                </p>
              </div>

              <div className="mb-3">
                <h6>🧠 Early Detection Challenges</h6>
                <p className="text-secondary small mb-0">
                  Detecting Alzheimer’s in early stages is difficult without
                  advanced analysis tools.
                </p>
              </div>

              <div>
                <h6>⚡ Faster AI Insights</h6>
                <p className="text-secondary small mb-0">
                  Neuro Fusion provides quick AI-powered MRI predictions for
                  better accessibility.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div
        className="py-5"
        style={{
          backgroundColor: "#111",
          color: "#fff",
        }}
      >
        <div className="container px-3">

          <h2
            className="text-center mb-5 fs-3 fw-bold"
            style={{ color: "#ffc107" }}
          >
            How It Works
          </h2>

          <div className="row g-4 text-center">

            <div className="col-12 col-md-4">
              <div
                className="p-4 rounded-4 h-100"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                }}
              >
                <div className="fs-1 mb-3">🧠</div>
                <h5>1. Upload MRI</h5>
                <p className="small mb-0 text-secondary">
                  Select and upload your brain MRI scan securely through the
                  platform.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div
                className="p-4 rounded-4 h-100"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                }}
              >
                <div className="fs-1 mb-3">🤖</div>
                <h5>2. AI Analysis</h5>
                <p className="small mb-0 text-secondary">
                  Our Deep Learning model analyzes MRI patterns associated with
                  Alzheimer’s disease.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div
                className="p-4 rounded-4 h-100"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                }}
              >
                <div className="fs-1 mb-3">📊</div>
                <h5>3. Get Result</h5>
                <p className="small mb-0 text-secondary">
                  Receive instant AI-generated prediction results and diagnostic
                  insights.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5 px-3">
        <h2 className="text-center mb-5 fs-3 fw-bold">
          Features
        </h2>

        <div className="row g-4">

          <div className="col-6 col-md-3">
            <div
              className="card text-center p-4 h-100 border-0 rounded-4"
              style={{
                backgroundColor: "#111",
                color: "#fff",
              }}
            >
              <div className="fs-1 mb-3">🧠</div>
              <h6>AI Detection</h6>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="card text-center p-4 h-100 border-0 rounded-4"
              style={{
                backgroundColor: "#111",
                color: "#fff",
              }}
            >
              <div className="fs-1 mb-3">⚡</div>
              <h6>Fast Results</h6>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="card text-center p-4 h-100 border-0 rounded-4"
              style={{
                backgroundColor: "#111",
                color: "#fff",
              }}
            >
              <div className="fs-1 mb-3">🔐</div>
              <h6>Secure Login</h6>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="card text-center p-4 h-100 border-0 rounded-4"
              style={{
                backgroundColor: "#111",
                color: "#fff",
              }}
            >
              <div className="fs-1 mb-3">📊</div>
              <h6>Smart Dashboard</h6>
            </div>
          </div>

        </div>
      </div>

      {/* BENEFITS SECTION */}
      <div className="container py-5 px-3">

        <div
          className="rounded-4 p-4 p-md-5"
          style={{
            background:
              "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
            color: "#fff",
            border: "1px solid #2a2a2a",
          }}
        >
          <div className="row g-4 align-items-center">

            <div className="col-lg-6">
              <h2
                className="fw-bold mb-4"
                style={{ color: "#ffc107" }}
              >
                How Neuro Fusion Helps
              </h2>

              <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                Neuro Fusion is designed to support faster and smarter
                MRI-based Alzheimer’s analysis using Artificial Intelligence.
                Our system simplifies the process by providing AI-powered
                assistance through an easy-to-use platform.
              </p>

              <p className="text-secondary" style={{ lineHeight: "1.9" }}>
                The goal is not to replace medical professionals, but to assist
                them with intelligent technology that can improve efficiency and
                accessibility in healthcare systems.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">

                <div className="col-6">
                  <div
                    className="p-3 rounded-3 text-center h-100"
                    style={{
                      backgroundColor: "#222",
                    }}
                  >
                    <h3 style={{ color: "#ffc107" }}>24/7</h3>
                    <small className="text-secondary">
                      AI Assistance
                    </small>
                  </div>
                </div>

                <div className="col-6">
                  <div
                    className="p-3 rounded-3 text-center h-100"
                    style={{
                      backgroundColor: "#222",
                    }}
                  >
                    <h3 style={{ color: "#ffc107" }}>Fast</h3>
                    <small className="text-secondary">
                      MRI Analysis
                    </small>
                  </div>
                </div>

                <div className="col-6">
                  <div
                    className="p-3 rounded-3 text-center h-100"
                    style={{
                      backgroundColor: "#222",
                    }}
                  >
                    <h3 style={{ color: "#ffc107" }}>Secure</h3>
                    <small className="text-secondary">
                      User System
                    </small>
                  </div>
                </div>

                <div className="col-6">
                  <div
                    className="p-3 rounded-3 text-center h-100"
                    style={{
                      backgroundColor: "#222",
                    }}
                  >
                    <h3 style={{ color: "#ffc107" }}>Smart</h3>
                    <small className="text-secondary">
                      AI Predictions
                    </small>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* CTA */}
      <div
        className="bg-dark text-white py-5 text-center px-3"
        style={{
          background:
            "linear-gradient(135deg, #000 0%, #111 100%)",
        }}
      >

        {!user ? (
          <>
            <h2 className="fs-3 fw-bold">
              Ready to analyze your MRI?
            </h2>

            <p className="text-secondary small">
              Create an account and start your AI diagnosis journey
            </p>

            <button
              className="btn btn-warning btn-lg mt-3 px-4 fw-semibold"
              onClick={() => router.push("/signup")}
            >
              Start Now
            </button>
          </>
        ) : (
          <>
            <h2 className="fs-3 fw-bold">
              Welcome back 👋
            </h2>

            <p className="text-secondary small">
              Continue your AI diagnosis from dashboard
            </p>

            <button
              className="btn btn-warning btn-lg mt-3 px-4 fw-semibold"
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