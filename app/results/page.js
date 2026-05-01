"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🚫 Not logged in → redirect
    if (!token) {
      router.push("/login");
      return;
    }

    // ✅ Logged in
    setAuthorized(true);

    const fetchResults = async () => {
      try {
        const res = await fetch(
          "https://neurofusion-iqt7.onrender.com/mri/get_results",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();

        if (json.success) setData(json.results);
        else setData([]);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [router]);

  // 🚫 Prevent UI flash before auth check
  if (!authorized) return null;

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h5>Loading results...</h5>
      </div>
    );
  }

  // ================= EMPTY =================
  if (!data.length) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h5>No MRI predictions found.</h5>
      </div>
    );
  }

  // ================= MAIN UI =================
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">
        🧠 MRI Analysis Results
      </h2>

      <div className="row">
        {data.map((item) => {
          const isPAD = item.prediction?.label?.includes("PAD");

          return (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">

                  {/* FILE NAME */}
                  <h5 className="card-title text-truncate">
                    {item.fileName || "Unnamed MRI"}
                  </h5>

                  {/* PREDICTION */}
                  <div className="mb-2" style={{ minHeight: "50px" }}>
                    <small className="text-muted">Prediction</small>
                    <h6
                      className={
                        isPAD
                          ? "text-danger fw-bold"
                          : "text-success fw-bold"
                      }
                    >
                      {item.prediction?.label || "N/A"}
                    </h6>
                  </div>

                  {/* PROBABILITIES */}
                  <div className="mb-3" style={{ minHeight: "70px" }}>
                    <small className="text-muted">Probabilities</small>

                    {Object.keys(item.probabilities || {}).length > 0 ? (
                      Object.entries(item.probabilities).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="d-flex justify-content-between small"
                          >
                            <span>{key}</span>
                            <span>
                              {(value * 100).toFixed(2)}%
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <>
                        <div className="d-flex justify-content-between small">
                          <span>&nbsp;</span>
                          <span>&nbsp;</span>
                        </div>
                        <div className="d-flex justify-content-between small">
                          <span>&nbsp;</span>
                          <span>&nbsp;</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* DATE */}
                  <div className="text-muted small mb-3">
                    {item.analysedAt
                      ? new Date(item.analysedAt).toLocaleString()
                      : "No date"}
                  </div>

                  {/* VIEW MRI BUTTON */}
                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm w-100"
                    >
                      View MRI
                    </a>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm w-100"
                      disabled
                    >
                      No File Available
                    </button>
                  )}

                  {/* VIEW PREDICTION IMAGE */}
                  {item.heatmapUrl ? (
                    <a
                      href={item.heatmapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-warning btn-sm w-100 mt-2"
                    >
                      View Prediction Heatmap
                    </a>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm w-100 mt-2"
                      disabled
                    >
                      No Prediction Image
                    </button>
                  )}

                  {/* ✅ REMOVE BUTTON (ADDED) */}
                  <button
                    className="btn btn-danger btn-sm w-100 mt-2"
                    onClick={async () => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this MRI?"
                      );
                      if (!confirmDelete) return;

                      try {
                        const token = localStorage.getItem("token");

                        const res = await fetch(
                          "https://neurofusion-iqt7.onrender.com/mri/remove",
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ id: item._id }),
                          }
                        );

                        const data = await res.json();

                        if (!res.ok) {
                          alert(data.message || "Delete failed");
                          return;
                        }

                        // 🔄 reload page after delete
                        window.location.reload();

                      } catch (err) {
                        console.error(err);
                        alert("Error deleting MRI");
                      }
                    }}
                  >
                    Remove
                  </button>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}