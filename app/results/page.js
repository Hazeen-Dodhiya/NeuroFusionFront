"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://neurofusion-iqt7.onrender.com/mri/get_results",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();

        if (json.success) {
          setData(json.results);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // =========================
  // 🧠 UI STATES
  // =========================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading results...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No predictions available.
      </div>
    );
  }

  // =========================
  // 🧠 MAIN UI
  // =========================

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">MRI Results</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            {/* File Name */}
            <h2 className="font-semibold mb-2">{item.fileName}</h2>

            {/* Prediction */}
            <p className="mb-2">
              <strong>Prediction:</strong>{" "}
              {item.prediction?.label || "N/A"}
            </p>

            {/* Probabilities */}
            <div className="mb-2">
              <strong>Probabilities:</strong>
              <ul className="text-sm mt-1">
                {Object.entries(item.probabilities || {}).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key}: {(value * 100).toFixed(2)}%
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Date */}
            <p className="text-sm text-gray-500 mb-2">
              {new Date(item.analysedAt).toLocaleString()}
            </p>

            {/* View File */}
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View MRI
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}