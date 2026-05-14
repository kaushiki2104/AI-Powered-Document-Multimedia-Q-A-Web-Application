import whisper
import os

model = whisper.load_model("base")

def transcribe_media(file_path: str) -> dict:
    """Transcribe audio/video and return text with timestamps."""
    result = model.transcribe(file_path, verbose=False)

    # Extract segments with timestamps
    segments = []
    for seg in result.get("segments", []):
        segments.append({
            "start": seg["start"],
            "end": seg["end"],
            "text": seg["text"].strip()
        })

    return {
        "text": result["text"],
        "segments": segments
    }

def find_timestamp_for_topic(segments: list, topic: str) -> list:
    """Find relevant timestamps for a given topic."""
    relevant = []
    topic_lower = topic.lower()
    for seg in segments:
        if any(word in seg["text"].lower() for word in topic_lower.split()):
            relevant.append(seg)
    return relevant