import React from "react";
import { useState } from "react";
import YouTubeTranscriber from "./components/YouTubeTranscriber";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <YouTubeTranscriber onTranscribe={setResult} />

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-2xl mx-auto">
          <h3 className="text-lg font-bold mb-2">📝 Transcript</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{result.transcript}</pre>

          <h3 className="text-lg font-bold mt-4 mb-2">🧠 Summary</h3>
          <p className="text-gray-700">{result.summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
