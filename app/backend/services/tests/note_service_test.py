import pytest
from ..note_service import NoteService
from .mocks.note_repo_mock import NoteRepositoryMock
from .mocks.user_service_mock import UserServiceMock

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
