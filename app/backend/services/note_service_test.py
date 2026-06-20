import pytest
from .note_service import NoteService


class NoteRepositoryMock:

    async def create_note(
        self, title: str, content: str, user_id: int, embeddings: list
    ):
        return {
            "id": 1,
            "title": title,
            "content": content,
            "user_id": user_id,
            "created_at": "2023-01-01",
            "embedding": ["Test Embedding"],
        }

    async def get_note_from_user(self, note_id: int, user_id: int):
        return {
            "id": note_id,
            "title": "Title Test",
            "content": "Content Test",
            "user_id": user_id,
            "created_at": "2023-01-01",
        }

    async def get_all_notes_from_user(self, user_id: int):
        return [
            {
                "id": 1,
                "title": "Title Test",
                "content": "Content Test",
                "user_id": user_id,
                "created_at": "2023-01-01",
            }
        ]

    async def update_note_from_user(
        self,
        note_id: int,
        user_id: int,
        embeddings: list,
        title: str = None,
        content: str = None,
    ):
        return {
            "id": 1,
            "title": title,
            "content": content,
            "user_id": 1,
            "created_at": "2023-01-01",
        }

    async def delete_note_from_user(self, note_id: int, user_id: int):
        return True


class UserServiceMock:

    async def get_user_by_id(self, user_id: int):
        return {"id": 1, "username": "User Test", "created_at": "2023-01-01"}


note_repo = NoteRepositoryMock()
user_service = UserServiceMock()
service = NoteService(note_repo, user_service)


@pytest.mark.asyncio
async def test_create_note():
    response = await service.create_note("Title Test", "Content Test", 1)
    assert response


@pytest.mark.asyncio
async def test_get_note_from_user():
    response = await service.get_note_from_user(1, 1)
    assert response


@pytest.mark.asyncio
async def test_get_all_notes_from_user():
    response = await service.get_all_notes_from_user(1)
    assert response


@pytest.mark.asyncio
async def test_update_note_from_user():
    response = await service.update_note_from_user(
        1, 1, "Title Test Update", "Content Test Update"
    )
    assert response


@pytest.mark.asyncio
async def test_delete_note_from_user():
    response = await service.delete_note_from_user(1, 1)
    assert response is None
