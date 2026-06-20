import pytest
from ..ai_service import AIService
from .mocks.note_repo_mock import NoteRepositoryMock
from .mocks.user_repo_mock import UserRepositoryMock

ai_service = AIService(NoteRepositoryMock(), UserRepositoryMock())

@pytest.mark.asyncio
async def test_ask():
    result = await ai_service.ask(user_id=1, prompt="Test Prompt")
    assert result
    assert result.ai_response
