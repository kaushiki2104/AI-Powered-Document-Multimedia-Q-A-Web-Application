from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.embeddings.base import Embeddings
from google import genai
from google.genai import types
from fastapi import HTTPException
from typing import List
import os

from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    google_api_key=settings.GEMINI_API_KEY
)

class GeminiEmbeddings(Embeddings):
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        result = client.models.embed_content(
            model="gemini-embedding-001",  # ✅ Fixed
            contents=texts,
            config=types.EmbedContentConfig(task_type="retrieval_document")
        )
        return [e.values for e in result.embeddings]

    def embed_query(self, text: str) -> List[float]:
        result = client.models.embed_content(
            model="gemini-embedding-001",  # ✅ Fixed
            contents=[text],
            config=types.EmbedContentConfig(task_type="retrieval_query")
        )
        return result.embeddings[0].values

embeddings = GeminiEmbeddings()

def ask_question(question):
    if not os.path.exists("faiss_index/index.faiss"):
        raise HTTPException(
            status_code=400,
            detail="No documents uploaded yet. Please upload a file first."
        )

    db = FAISS.load_local(
        "faiss_index",
        embeddings,
        allow_dangerous_deserialization=True
    )

    docs = db.similarity_search(question)

    context = "\n".join([doc.page_content for doc in docs])

    prompt = f"""
    Answer the question using the context below.

    Context:
    {context}

    Question:
    {question}
    """

    response = llm.invoke(prompt)
    return response.content