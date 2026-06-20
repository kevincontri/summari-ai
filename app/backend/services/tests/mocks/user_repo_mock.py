class UserRepositoryMock:

    async def create_user(self, username: str, password: str, email: str):
        return {
            "id": 1,
            "username": "Test User",
            "email": "user@user",
            "created_at": "2020-01-01T00:00:00.000Z",
        }

    async def get_user_by_id(self, user_id: int):
        return {
            "id": 1,
            "username": "Test User",
            "email": "user@user",
            "created_at": "2020-01-01T00:00:00.000Z",
        }

    async def get_user_by_email(self, email: str):
        if email == "user@user":
            return {
                "id": 1,
                "username": "Test User",
                "email": "user@user",
                "created_at": "2020-01-01T00:00:00.000Z",
            }
        else:
            return None

    async def get_all_users(self):
        return [
            {"id": 1, "username": "Test User", "email": "user@user", "created_at": "2020-01-01T00:00:00.000Z"}
        ]