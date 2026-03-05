from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from database import users_col
from models.user import UserRegister, UserLogin, UserOut, TokenResponse
from middleware.auth import get_current_user
from bson import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret")
ALGORITHM  = os.getenv("ALGORITHM", "HS256")
EXPIRE_MIN = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 10080))


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=EXPIRE_MIN)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def format_user(doc) -> dict:
    return {
        "id":               str(doc["_id"]),
        "name":             doc["name"],
        "email":            doc["email"],
        "is_admin":         doc.get("is_admin", False),
        "selected_services":doc.get("selected_services", []),
        "created_at":       doc.get("created_at", datetime.utcnow()),
    }


@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(body: UserRegister):
    existing = await users_col.find_one({"email": body.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    doc = {
        "name":               body.name,
        "email":              body.email,
        "password":           hash_password(body.password),
        "is_admin":           False,
        "is_verified":        False,
        "selected_services":  [],
        "application_ids":    [],
        "payment_ids":        [],
        "created_at":         datetime.utcnow(),
    }
    result = await users_col.insert_one(doc)
    doc["_id"] = result.inserted_id

    user_data = format_user(doc)
    token = create_token({"sub": str(result.inserted_id)})
    return {"access_token": token, "token_type": "bearer", "user": user_data}


@router.post("/login", response_model=TokenResponse)
async def login(body: UserLogin):
    user = await users_col.find_one({"email": body.email})
    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_data = format_user(user)
    token = create_token({"sub": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer", "user": user_data}


@router.get("/me")
async def me(current_user=Depends(get_current_user)):
    return format_user(current_user)
