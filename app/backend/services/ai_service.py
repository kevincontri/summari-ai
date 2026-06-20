from app.backend.repositories.interfaces.user_repository import UserRepositoryInterface
from app.backend.repositories.interfaces.note_repository import NoteRepositoryInterface
from app.backend.exceptions.exceptions import NotFoundError
from app.backend.services.interfaces.ai_service import AIServiceInterface
from app.backend.ai_settings.ai_client import GroqClient
from app.backend.schemas.ai_schemas import *
from app.backend.ai_settings.embedding_client import EmbeddingClient
from langchain_community.vectorstores import FAISS
from app.backend.ai_settings.embedding_client import embeddings
from app.backend.ai_settings.ai_client import GroqClient
from app.backend.ai_settings.prompt_enhancer import PROMPT_ENHANCER

class AIService(AIServiceInterface):

    def __init__(
        self, note_repo: NoteRepositoryInterface, user_repo: UserRepositoryInterface
    ):
        self.note_repo = note_repo
        self.user_repo = user_repo

    # Main function for AI, fetch user notes and format prompt for LLM
    async def ask(self, user_id: int, prompt: str):
        user_notes = await self.__get_user_notes(user_id)
  
        ranked_notes = await self.__rank_notes(prompt, user_notes)
        
        clean_notes = self.__prepare_notes_for_llm(ranked_notes)
        
        enriched_prompt = PROMPT_ENHANCER.format(notes=clean_notes, user_prompt=prompt)
        
        groq = GroqClient(notes=clean_notes, prompt=enriched_prompt)
        
        llm_response = await groq.chat()

        return PromptResponse(ai_response=llm_response)

    # Function to rank notes using FAISS
    async def __rank_notes(self, prompt: str, notes: list):
        
        text_embeddings = [(n["content"], n["embedding"]) for n in notes if n.get("embedding")]
        
        metadatas = [{"title": n["title"], "content": n["content"]} for n in notes if n.get("embedding")]
        
        store = FAISS.from_embeddings(text_embeddings=text_embeddings, embedding=embeddings, metadatas=metadatas)
        
        results = await store.asimilarity_search_with_relevance_scores(prompt, k=5)
        
        return [doc.metadata for doc, score in results if score > 0.4]
    
    async def __get_user_notes(self, user_id: int):
        if await self.user_repo.get_user_by_id(user_id):
            notes = await self.note_repo.get_user_notes(user_id=user_id)
            return notes
        else:
            raise NotFoundError("User not found")
        
    def __prepare_notes_for_llm(self, notes):
        return [{"title": note["title"], "content": note["content"]} for note in notes]
