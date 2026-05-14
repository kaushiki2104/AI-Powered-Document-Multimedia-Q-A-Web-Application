from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register():

    response = client.post(
        '/api/auth/register',
        json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "123456"
        }
    )

    assert response.status_code in [200, 400]

def test_login():

    response = client.post(
        '/api/auth/login',
        json={
            "email": "test@example.com",
            "password": "123456"
        }
    )

    assert response.status_code in [200, 401]