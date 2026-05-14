from fastapi import APIRouter
from app.services.llm_service import ask_question

router = APIRouter()

@router.post("")
async def chat(data: dict):
    response = ask_question(data['question'])

    return {
        "answer": response
    }