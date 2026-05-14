from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.embeddings.base import Embeddings
from google import genai
from google.genai import types
from typing import List

from app.core.config import settings

# ✅ v1 API force karo
client = genai.Client(
    api_key=settings.GEMINI_API_KEY,
)

class GeminiEmbeddings(Embeddings):
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        result = client.models.embed_content(
            model="gemini-embedding-001",  # ✅ Updated
            contents=texts,
            config=types.EmbedContentConfig(task_type="retrieval_document")
        )
        return [e.values for e in result.embeddings]

    def embed_query(self, text: str) -> List[float]:
        result = client.models.embed_content(
            model="gemini-embedding-001",  # ✅ Updated
            contents=[text],
            config=types.EmbedContentConfig(task_type="retrieval_query")
        )
        return result.embeddings[0].values

embeddings = GeminiEmbeddings()

def create_vector_store(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks = splitter.split_text(text)
    vector_store = FAISS.from_texts(chunks, embeddings)
    vector_store.save_local("faiss_index")
    return vector_store