import { useState } from "react";
import axios from "axios";
import MediaPlayer from "./MediaPlayer";
import SummaryBox from "./SummaryBox";
import {
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );

      setMessage(
        `${res.data.message} — ${res.data.text_length} characters extracted`
      );

      setUploadedFile({
        filename: file.name,
        fileType: res.data.file_type,
      });
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
          <UploadCloud className="text-white w-7 h-7" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Upload File
          </h2>

          <p className="text-gray-500 text-sm sm:text-base">
            Upload PDF, audio, or video files to analyze with AI
          </p>
        </div>

      </div>

      {/* Upload Area */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">

        <label className="w-full cursor-pointer">
          <div className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 rounded-2xl p-6 text-center">

            <div className="flex flex-col items-center justify-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center shadow-md">
                <FileText className="text-white w-7 h-7" />
              </div>

              <div>
                <p className="text-gray-700 font-semibold mb-1 break-all">
                  {file ? file.name : "Choose a file"}
                </p>

                <p className="text-sm text-gray-500">
                  PDF, MP3, MP4, WAV, AVI, MOV
                </p>
              </div>

            </div>

            <input
              type="file"
              accept=".pdf,.mp3,.mp4,.wav,.avi,.mov"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />

          </div>
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className={`w-full lg:w-auto px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
            ${
              loading || !file
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 active:scale-95 hover:from-blue-600 hover:to-indigo-600"
            }`}
        >
          <UploadCloud className="w-5 h-5" />

          {loading ? "Uploading..." : "Upload"}
        </button>

      </div>

      {/* Success Message */}
      {message && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 text-sm sm:text-base shadow-sm flex items-start gap-3">

          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />

          <span>{message}</span>

        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm sm:text-base shadow-sm flex items-start gap-3">

          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />

          <span>{error}</span>

        </div>
      )}

      {/* Summary Section */}
      {uploadedFile && (
        <div className="mt-8">
          <SummaryBox />
        </div>
      )}

      {/* Media Player */}
      {uploadedFile && uploadedFile.fileType !== "pdf" && (
        <div className="mt-8">
          <MediaPlayer
            filename={uploadedFile.filename}
            fileType={uploadedFile.fileType}
          />
        </div>
      )}

    </div>
  );
}