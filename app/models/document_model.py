from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentModel(BaseModel):

    filename: str
    filetype: str
    extracted_text: str

    summary: Optional[str] = None

    created_at: datetime = datetime.utcnow()