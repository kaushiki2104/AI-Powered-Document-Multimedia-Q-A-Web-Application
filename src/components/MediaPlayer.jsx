import { useState, useRef } from "react";
import axios from "axios";
import {
  Play,
  Search,
  Clock3,
  Video,
  Music2,
} from "lucide-react";

export default function MediaPlayer({ filename, fileType }) {
  const [topic, setTopic] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [error, setError] = useState("");
  const mediaRef = useRef(null);

  const isVideo = fileType === "video";
  const mediaUrl = `http://localhost:8000/api/upload/media/${filename}`;

  const fetchTimestamps = async () => {
    if (!topic) return;

    setError("");

    try {
      const res = await axios.get(
        `http://localhost:8000/api/media/timestamps?topic=${topic}`
      );

      setTimestamps(res.data.timestamps);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch timestamps");
    }
  };

  const playAt = (seconds) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = seconds;
      mediaRef.current.play();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${m}:${s}`;
  };

  if (!filename || fileType === "pdf") return null;

  return (
    <div className="mt-8 bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-5 sm:p-6 md:p-8 transition-all duration-300">

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
          {isVideo ? (
            <Video className="text-white w-7 h-7" />
          ) : (
            <Music2 className="text-white w-7 h-7" />
          )}
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Media Player
          </h3>

          <p className="text-gray-500 text-sm sm:text-base">
            Play media and search smart timestamps instantly
          </p>
        </div>

      </div>

      {/* Media */}
      <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-black">

        {isVideo ? (
          <video
            ref={mediaRef}
            src={mediaUrl}
            controls
            className="w-full rounded-2xl"
          />
        ) : (
          <div className="p-4 bg-gray-50">
            <audio
              ref={mediaRef}
              src={mediaUrl}
              controls
              className="w-full"
            />
          </div>
        )}

      </div>

      {/* Search Box */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Search topic (e.g. introduction)"
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all duration-200 text-sm sm:text-base"
          />

        </div>

        <button
          onClick={fetchTimestamps}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
        >
          <Search className="w-5 h-5" />
          Find Timestamps
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      {/* Timestamp Results */}
      {timestamps.length > 0 && (
        <div className="mt-8">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
              <Clock3 className="text-white w-5 h-5" />
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
              Relevant Timestamps
            </h4>

          </div>

          <div className="space-y-4">

            {timestamps.map((ts, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300"
              >

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">

                  <span className="font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-xl text-sm w-fit">
                    {formatTime(ts.start)} - {formatTime(ts.end)}
                  </span>

                  <p className="text-gray-700 text-sm sm:text-base leading-7">
                    {ts.text}
                  </p>

                </div>

                <button
                  onClick={() => playAt(ts.start)}
                  className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Play
                </button>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}