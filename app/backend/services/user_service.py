from .interfaces.user_service import UserServiceInterface
from app.backend.repositories.interfaces.user_repository import UserRepositoryInterface
from app.backend.exceptions.exceptions import *
from app.backend.core.security import hash_password, verify_password
from app.backend.core.auth import create_access_token


class UserService(UserServiceInterface):

    def __init__(self, repo: UserRepositoryInterface):
        self.repo = repo

    async def create_user(self, username: str, password: str, email: str):
        if await self.__isduplicate(email):
            raise DuplicateError("Email already exists")

        hashed_password = hash_password(password)

        user = await self.repo.create_user(username, hashed_password, email)

        return user

    async def get_user_by_id(self, user_id: int):
        user = await self.repo.get_user_by_id(user_id)
        if not user:
            raise NotFoundError("User not found")
        return user

    async def get_all_users(self):
        users = await self.repo.get_all_users()
        return users

    async def verify_user_credentials(self, email: str, password: str):
        user = await self.repo.get_user_by_email(email)
        if not user:
            raise NotFoundError("User not found")

        if not verify_password(password, user["password_hash"]):
            raise InvalidCredentialsError("Invalid credentials")

        token = create_access_token(user["id"])

        return token

    async def __isduplicate(self, email: str):
        return bool(await self.repo.get_user_by_email(email))
