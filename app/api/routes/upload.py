from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse
import shutil
import os
import json

from app.services.pdf_service import extract_pdf_text
from app.services.whisper_service import transcribe_media
from app.services.vector_service import create_vector_store

router = APIRouter()

UPLOAD_DIR = "uploads"
METADATA_FILE = "uploads/metadata.json"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_metadata(data: dict):
    existing = {}
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, "r") as f:
            existing = json.load(f)
    existing.update(data)
    with open(METADATA_FILE, "w") as f:
        json.dump(existing, f)


def get_metadata() -> dict:
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, "r") as f:
            return json.load(f)
    return {}


@router.post("")
async def upload_file(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = ""
    segments = []
    file_type = "pdf"

    # PDF FILE
    if file.filename.lower().endswith(".pdf"):
        text = extract_pdf_text(file_path)
        file_type = "pdf"

    # AUDIO / VIDEO FILE
    else:
        transcript = transcribe_media(file_path)
        text = transcript["text"]
        segments = transcript.get("segments", [])
        file_type = "video" if file.filename.lower().endswith(
            (".mp4", ".avi", ".mov", ".mkv")
        ) else "audio"

    # Save metadata (segments + file info)
    save_metadata({
        "filename": file.filename,
        "file_path": file_path,
        "file_type": file_type,
        "text": text,
        "segments": segments
    })

    # CREATE VECTOR DATABASE
    create_vector_store(text)

    return {
        "message": "File uploaded successfully",
        "file_type": file_type,
        "text_length": len(text),
        "segments_count": len(segments),
        "preview": text[:500]
    }


@router.get("/media/{filename}")
async def serve_media(filename: str):
    """Serve audio/video file for playback."""
    file_path = f"{UPLOAD_DIR}/{filename}"
    if not os.path.exists(file_path):
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)


@router.get("/metadata")
async def get_file_metadata():
    """Get uploaded file metadata including segments."""
    return get_metadata()