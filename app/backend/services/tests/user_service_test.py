import pytest
from ..user_service import UserService
from .mocks.user_repo_mock import UserRepositoryMock

repo = UserRepositoryMock()
user_service = UserService(repo)


@pytest.mark.asyncio
async def test_create_user():
    response = await user_service.create_user("New User", "password", "new@example.com")
    assert response


@pytest.mark.asyncio
async def test_get_user_by_id():
    response = await user_service.get_user_by_id(1)
    assert response
    assert "id" in response
    assert "username" in response
    assert "created_at" in response
    assert "email" in response


@pytest.mark.asyncio
async def test_get_all_users():
    response = await user_service.get_all_users()
    assert response
