from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
import time

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    google_api_key=settings.GEMINI_API_KEY
)

def summarize_text(text: str) -> str:

    prompt = f"""
    Summarize the following content clearly and concisely.
    Include key points, main topics, and important details.

    Content:
    {text[:5000]}

    Provide a structured summary with:
    - Main Topic
    - Key Points (bullet points)
    - Conclusion
    """

    for attempt in range(3):
        try:
            response = llm.invoke(prompt)
            return response.content
        except Exception as e:
            if attempt < 2:
                time.sleep(2)
                continue
            raise Exception(f"Summary failed: {str(e)}")