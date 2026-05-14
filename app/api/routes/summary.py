from fastapi import APIRouter, HTTPException
import json
import os

from app.services.summary_service import summarize_text

router = APIRouter()

METADATA_FILE = "uploads/metadata.json"


@router.get("")
async def get_summary():
    if not os.path.exists(METADATA_FILE):
        raise HTTPException(
            status_code=400,
            detail="No file uploaded yet. Please upload a file first."
        )

    with open(METADATA_FILE, "r") as f:
        metadata = json.load(f)

    text = metadata.get("text", "")
    if not text:
        raise HTTPException(status_code=400, detail="No text found in uploaded file.")

    summary = summarize_text(text)

    return {
        "filename": metadata.get("filename"),
        "file_type": metadata.get("file_type"),
        "summary": summary
    }