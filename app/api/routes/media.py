from fastapi import APIRouter, HTTPException
import json
import os

from app.services.whisper_service import find_timestamp_for_topic

router = APIRouter()

METADATA_FILE = "uploads/metadata.json"


@router.get("/timestamps")
async def get_timestamps(topic: str):
    """Get timestamps for a specific topic in audio/video."""
    if not os.path.exists(METADATA_FILE):
        raise HTTPException(status_code=400, detail="No file uploaded yet.")

    with open(METADATA_FILE, "r") as f:
        metadata = json.load(f)

    segments = metadata.get("segments", [])
    if not segments:
        raise HTTPException(
            status_code=400,
            detail="No timestamps available. Upload an audio/video file first."
        )

    relevant = find_timestamp_for_topic(segments, topic)

    return {
        "topic": topic,
        "filename": metadata.get("filename"),
        "timestamps": relevant
    }