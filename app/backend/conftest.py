import os
from pathlib import Path

TEST_DB_FILE = Path(__file__).parent / "test.db"
if TEST_DB_FILE.exists():
    TEST_DB_FILE.unlink()
    
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{TEST_DB_FILE.as_posix()}"

import pytest
import pytest_asyncio
from unittest.mock import AsyncMock, patch

# Mock the AI responses (Deactivate if you want to test the real AI model response)
@pytest.fixture(scope="session")
def _mock_groq():
    embed_patch = patch(
        "app.backend.ai_settings.embedding_client.EmbeddingClient.message_embedding",
        new=AsyncMock(return_value=[0.1] * 3072),
    )
    groq_patch = patch(
        "app.backend.ai_settings.ai_client.GroqClient.chat",
        new=AsyncMock(return_value="Mock AI response"),
    )
    query_patch = patch(
        "langchain_google_genai.embeddings.GoogleGenerativeAIEmbeddings.aembed_query",
        new=AsyncMock(return_value=[0.1] * 3072),
    )

    embed_patch.start()
    groq_patch.start()
    query_patch.start()
    yield
    embed_patch.stop()
    groq_patch.stop()
    query_patch.stop()


@pytest_asyncio.fixture(scope="session", autouse=True)
async def _init_test_db():
    from app.backend.database.database import init_db, AsyncSessionLocal, engine
    from app.backend.models.user import User
    from app.backend.models.note import Note
    from app.backend.core.security import hash_password
    from sqlalchemy import insert

    await init_db()

    async with AsyncSessionLocal() as session:
        await session.execute(
            insert(User).values(
                id=1,
                username="seed_user",
                password_hash=hash_password("seed_pass"),
            )
        )
        await session.execute(
            insert(Note).values(
                id=1,
                title="Seed Title",
                content="Seed Content",
                user_id=1,
                embedding=[0.1] * 3072,
            )
        )
        await session.commit()

    yield

    await engine.dispose()
    if TEST_DB_FILE.exists():
        TEST_DB_FILE.unlink()
