from pydantic import BaseModel, Field
from typing import List


class UserCreate(BaseModel):
    username: str = Field(..., max_length=100, min_length=3)
    email: str = Field(..., max_length=100, min_length=3)
    password: str = Field(..., min_length=8, max_length=30)


class User(BaseModel):
    id: int
    username: str
    email: str | None = None
    created_at: str


class SingleUserResponse(BaseModel):
    user: User


class MultipleUserResponse(BaseModel):
    count: int
    users: List[User]


class UserLogin(BaseModel):
    email: str = Field(..., min_length=3, max_length=100)
    password: str = Field(..., min_length=8, max_length=30)
