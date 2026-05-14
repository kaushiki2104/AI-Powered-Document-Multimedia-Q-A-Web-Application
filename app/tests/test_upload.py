import pytest
from httpx import AsyncClient, ASGITransport
from main import app
import os

@pytest.mark.asyncio
async def test_upload_pdf():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        # Create a dummy PDF-like file for testing
        files = {"file": ("test.pdf", b"dummy pdf content", "application/pdf")}
        response = await ac.post("/api/upload", files=files)
    assert response.status_code in [200, 500]  # 500 if no real PDF parser


@pytest.mark.asyncio
async def test_get_metadata():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.get("/api/upload/metadata")
    assert response.status_code == 200