class UserServiceMock:

    async def get_user_by_id(self, user_id: int):
        return {"id": 1, "username": "User Test", "created_at": "2023-01-01"}