from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from .prompt_enhancer import PROMPT_ENHANCER
import os
import dotenv

dotenv.load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

model = ChatGroq(model="llama-3.1-8b-instant", temperature=0.4, max_retries= 2, api_key=GROQ_API_KEY)

class GroqClient:
    def __init__(self, notes: list, prompt: str):
        self.prompt = prompt
        self.notes = notes
        
    async def chat(self) -> str:
        template = PROMPT_ENHANCER
        chat_prompt = ChatPromptTemplate.from_template(template)
        message = chat_prompt.format_messages(notes=self.notes, user_prompt=self.prompt)
        result = await model.ainvoke(message)
        return result.content