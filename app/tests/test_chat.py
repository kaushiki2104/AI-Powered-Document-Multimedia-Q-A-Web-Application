import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.mark.asyncio
async def test_chat_no_document():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.post("/api/chat", json={"question": "What is this?"})
    assert response.status_code == 400
    assert "No documents" in response.json()["detail"]


@pytest.mark.asyncio
async def test_chat_missing_question():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.post("/api/chat", json={})
    assert response.status_code == 500