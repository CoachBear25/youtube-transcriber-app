import React, { useState, useEffect } from "react";

const steps = ["Downloading", "Transcribing", "Summarizing"];

const YouTubeTranscriber = () => {
  const [videoURL, setVideoURL] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 🔄 Apply theme to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTranscript("");
    setSummary("");
    setError("");
    setCurrentStep(0);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoURL }),
      });

      if (!res.ok) throw new Error("Failed to fetch transcription");

      const data = await res.json();

      setCurrentStep(1);
      await delay(1000);

      setTranscript(data.transcript || "");
      setCurrentStep(2);
      await delay(1000);

      setSummary(data.summary || "");
      setTimeout(() => setCurrentStep(3), 500);
    } catch (err) {
      console.error(err);
      setError("⚠️ Something went wrong. Please try again.");
      setCurrentStep(-1);
    } finally {
      setLoading(false);
    }
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            🎥 YouTube Transcript Generator
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:opacity-80 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Paste your YouTube link here"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-full text-lg font-semibold ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading && (
              <svg
                className="w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Processing..." : "Get Transcript"}
          </button>
        </form>

        {/* Tip Box */}
        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded text-sm">
          💡 Pro tip: Make sure the video is public and has clear audio.
        </div>

        {/* Stepper */}
        <div className="mt-6 space-y-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              {index < currentStep ? (
                <span className="text-green-500">✅</span>
              ) : index === currentStep ? (
                <span className="text-yellow-500 animate-pulse">🟢</span>
              ) : (
                <span className="text-gray-400">⚪</span>
              )}
              <span
                className={`${
                  index === currentStep
                    ? "font-semibold text-gray-800 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-600 bg-red-50 dark:bg-red-800 dark:text-red-200 p-3 rounded">
            {error}
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              📄 Transcript
            </h3>
            <div className="max-h-64 overflow-y-auto bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm whitespace-pre-wrap shadow-inner text-gray-800 dark:text-gray-100">
              {transcript}
            </div>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
              🧠 Summary
            </h3>
            <div className="max-h-64 overflow-y-auto bg-green-50 dark:bg-green-900 p-4 rounded-lg text-sm whitespace-pre-wrap shadow-inner text-gray-800 dark:text-gray-100">
              {summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeTranscriber;
