import { useState } from "react";
import axios from "axios";
import { FileText, Sparkles } from "lucide-react";

export default function SummaryBox() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:8000/api/summary");
      setSummary(res.data.summary);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <FileText className="text-white w-7 h-7" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              Document Summary
            </h3>

            <p className="text-gray-500 text-sm sm:text-base">
              Generate AI-powered summaries from uploaded files
            </p>
          </div>

        </div>

        <button
          onClick={fetchSummary}
          disabled={loading}
          className={`px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 w-full sm:w-auto
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 hover:scale-105 active:scale-95"
            }`}
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-5 text-sm sm:text-base">
          {error}
        </div>
      )}

      {summary && (
        <div className="bg-gradient-to-r from-gray-50 to-green-50 border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-inner animate-fadeIn">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>

            <h4 className="text-xl font-semibold text-gray-800">
              AI Generated Summary
            </h4>

          </div>

          <p className="text-gray-700 leading-8 whitespace-pre-wrap text-sm sm:text-base">
            {summary}
          </p>

        </div>
      )}

    </div>
  );
}