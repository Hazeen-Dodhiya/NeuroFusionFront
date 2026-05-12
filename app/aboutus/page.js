import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Hazeen Dodhiya",
      id: "22K-4357",
      linkedin:
        "https://www.linkedin.com/in/hazeen-dodhiya-b9505035a/?skipRedirect=true",
      github: "https://github.com/Hazeen-Dodhiya",
      gmail: "mailto:hazeenwork@gmail.com",
    },
    {
      name: "Owais Aamir",
      id: "22K-4322",
      linkedin: "https://www.linkedin.com/in/owais-aamir-b944b8287/?skipRedirect=true",
      github: "",
      gmail: "mailto:k224322@nu.edu.pk",
    },
    {
      name: "Hanzalah Umer",
      id: "22K-4156",
      linkedin: "https://www.linkedin.com/in/hanzala-h-umer-b43339335/",
      github: "https://github.com/hanzalahcmd",
      gmail: "mailto:k224156@nu.edu.pk",
    },
  ];

  return (
    <div
      className="container py-5"
      style={{
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <div
        className="text-center p-5 mb-5 rounded-4"
        style={{
          background:
            "linear-gradient(135deg, #111 0%, #1c1c1c 50%, #000 100%)",
          border: "1px solid #2b2b2b",
          boxShadow: "0 0 25px rgba(255, 193, 7, 0.15)",
        }}
      >
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "3rem",
            color: "#ffc107",
            letterSpacing: "1px",
          }}
        >
          About Neuro Fusion
        </h1>

        <p
          className="mx-auto"
          style={{
            maxWidth: "850px",
            color: "#d1d1d1",
            fontSize: "1.1rem",
            lineHeight: "1.9",
          }}
        >
          Neuro Fusion is an AI-powered medical assistance project designed to
          help in the early detection and prediction of Alzheimer’s disease.
        </p>
      </div>

      {/* Main Content */}
      <div className="row g-4">
        {/* Left Side */}
        <div className="col-lg-7">
          <div
            className="p-4 rounded-4 h-100"
            style={{
              backgroundColor: "#111",
              border: "1px solid #2a2a2a",
            }}
          >
            <h3
              className="mb-4 fw-bold"
              style={{ color: "#ffc107" }}
            >
              Project Overview
            </h3>

            <p style={{ color: "#d4d4d4", lineHeight: "1.9" }}>
              This system allows users to upload MRI scans, which are then
              analyzed using advanced Artificial Intelligence and Machine
              Learning models to detect patterns associated with Alzheimer’s.
            </p>

            <p style={{ color: "#d4d4d4", lineHeight: "1.9" }}>
              The platform provides a complete user system where users can:
            </p>

            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderLeft: "4px solid #ffc107",
                  }}
                >
                  ✅ Create an account
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderLeft: "4px solid #ffc107",
                  }}
                >
                  🔐 Login securely
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderLeft: "4px solid #ffc107",
                  }}
                >
                  🚪 Logout anytime
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderLeft: "4px solid #ffc107",
                  }}
                >
                  🧠 Upload MRI scans
                </div>
              </div>

              <div className="col-md-12 mb-2">
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderLeft: "4px solid #ffc107",
                  }}
                >
                  🤖 Receive AI-based prediction results
                </div>
              </div>
            </div>

            <p
              className="mt-4"
              style={{ color: "#d4d4d4", lineHeight: "1.9" }}
            >
              Neuro Fusion aims to assist doctors and patients by providing
              fast, reliable, and AI-driven diagnostic insights for early-stage
              Alzheimer’s detection.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-5">
          <div
            className="p-4 rounded-4 mb-4"
            style={{
              backgroundColor: "#111",
              border: "1px solid #2a2a2a",
            }}
          >
            <h3
              className="fw-bold mb-4"
              style={{ color: "#ffc107" }}
            >
              Our Mission
            </h3>

            <p
              style={{
                color: "#d4d4d4",
                lineHeight: "1.9",
              }}
            >
              Our goal is to combine Artificial Intelligence with medical
              technology to support faster and more accessible Alzheimer’s
              detection through MRI analysis.
            </p>
          </div>

          {/* Team Section */}
          <div
            className="p-4 rounded-4"
            style={{
              backgroundColor: "#111",
              border: "1px solid #2a2a2a",
            }}
          >
            <h3
              className="fw-bold mb-4"
              style={{ color: "#ffc107" }}
            >
              Team Members
            </h3>

            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center p-3 mb-3 rounded-3"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #2f2f2f",
                }}
              >
                <div>
                  <h5 className="mb-1 text-white">{member.name}</h5>
                  <small style={{ color: "#b0b0b0" }}>
                    Student ID: {member.id}
                  </small>
                </div>

                <div className="d-flex gap-3 fs-5">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#ffc107" }}
                    >
                      <FaLinkedin />
                    </a>
                  ) : (
                    <span style={{ width: "20px" }}></span>
                  )}

                  {member.github ? (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#ffc107" }}
                    >
                      <FaGithub />
                    </a>
                  ) : (
                    <span style={{ width: "20px" }}></span>
                  )}

                  <a
                    href={member.gmail}
                    style={{ color: "#ffc107" }}
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}