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

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading results...
      </div>
    );
  }

  // ================= EMPTY =================
  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        No MRI predictions found.
      </div>
    );
  }

  // ================= MAIN UI =================
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🧠 MRI Analysis Results
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => {
          const isPAD = item.prediction?.label?.includes("PAD");

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 border border-gray-100"
            >
              {/* FILE NAME */}
              <h2 className="font-semibold text-lg mb-2 text-gray-800 truncate">
                {item.fileName}
              </h2>

              {/* PREDICTION */}
              <div className="mb-3">
                <p className="text-sm text-gray-500">Prediction</p>
                <p
                  className={`text-base font-bold ${
                    isPAD ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.prediction?.label || "N/A"}
                </p>
              </div>

              {/* PROBABILITIES */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">
                  Probabilities
                </p>

                <div className="space-y-1 text-sm">
                  {Object.entries(item.probabilities || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between"
                      >
                        <span className="text-gray-700">
                          {key}
                        </span>
                        <span className="font-medium">
                          {(value * 100).toFixed(2)}%
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* DATE */}
              <p className="text-xs text-gray-400 mb-4">
                {new Date(item.analysedAt).toLocaleString()}
              </p>

              {/* BUTTON */}
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
              >
                View MRI
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}