from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
import dotenv

dotenv.load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2", api_key=GOOGLE_API_KEY)

class EmbeddingClient:
    async def message_embedding(self, text: str) -> list[float]:
        return await embeddings.aembed_query(text)

