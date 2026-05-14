from fastapi import APIRouter, HTTPException
from app.models.user_model import UserRegister
from app.core.database import db
from passlib.context import CryptContext
from app.core.security import create_access_token

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"])

@router.post('/register')
async def register(user: UserRegister):
    existing = await db.users.find_one({"email": user.email})

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = pwd_context.hash(user.password)

    await db.users.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed
    })

    return {"message": "User registered"}

@router.post('/login')
async def login(user: dict):
    db_user = await db.users.find_one({"email": user['email']})

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    valid = pwd_context.verify(user['password'], db_user['password'])

    if not valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user['email']})

    return {"access_token": token}