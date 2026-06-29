<div align="center">
  <img src="app/frontend/vite-app/src/assets/summari-logo.svg" width="96" alt="Summari logo" />
  <h1>Summari</h1>
  <p><em>A personal AI knowledge base — store, search and query your notes, augmented with AI.</em></p>
</div>

> Note: formerly named **AI Knowledge Base API**. This update adds a full web interface (Summari) and migrates the AI layer to LangChain with cloud model providers.

Summari is a full-stack application for storing, searching, and querying user content (notes, articles, ideas) and augmenting it with AI features such as embeddings, semantic search, and LLM answers grounded in the user's own notes. It pairs a FastAPI backend with a React + TypeScript frontend.

### You can access Summari [Here](https://summari-ai-nzmf.onrender.com/login)

## Roadmap

What's done in this update:
- ✅ **Frontend interface** — full React + TypeScript web app (Summari)
- ✅ **Dark mode** — global theme with persistence across Login, Register and Dashboard
- ✅ **LangChain AI layer** — migrated from local Ollama to LangChain with Groq (LLM) and Google Gemini (embeddings), with FAISS for vector search

What's still coming:
- Further AI/agent refactoring and complexity abstraction
- Test coverage improvement
- Project architecture rearrangement for better overall organization
- Cloud deploy

---

## What this project demonstrates

**Backend fundamentals with an applied AI layer:**

- Layered architecture (controllers, services, repositories) following the MVC pattern
- Request validation with Pydantic
- PostgreSQL persistence (configurable via the `DATABASE_URL` environment variable; async driver support)
- JWT authentication and password hashing
- Unit tests for functions of all layers and the API
- AI integration (LangChain) for embeddings, vector search and grounded LLM answers

**A modern frontend that consumes the API:**

- Authentication flow (register / login / logout) backed by JWT, with protected routes
- Notes CRUD with a responsive card grid and modal editor
- Instant client-side search across notes
- AI panel: ask a question over your notes and get an LLM answer plus the most relevant related notes
- Dark mode with a persisted global theme
- Server state managed with React Query (cache is cleared on logout to avoid leaking data between accounts)

## AI Layer (LangChain)

The AI stack moved from a local Ollama setup to **LangChain** orchestrating cloud model providers:

- **LLM** — Groq `llama-3.1-8b-instant` via `langchain-groq`, prompted to answer **only** from the user's notes (grounded QA)
- **Embeddings** — Google Gemini `gemini-embedding-2` via `langchain-google-genai`
- **Vector search** — note embeddings are loaded into a `FAISS` store and ranked by relevance-scored similarity; the top related notes (score > 0.4) are returned alongside the answer

Requires the API keys `GROQ_API_KEY` and `GOOGLE_API_KEY` (see configuration below).

## v2 — Docker & Infrastructure Updates

- **Multi-stage Docker build** — dependencies are compiled in an isolated builder stage and only the final venv is copied into the lean runtime image, keeping the production image small
- **Non-root container** — the API process runs as `appuser` (UID 1001) instead of root, reducing the risk of any container escape
- **Health checks** — Docker monitors the API (`/health`) and PostgreSQL (`pg_isready`) and will restart unhealthy containers automatically
- **Persistent volume** — PostgreSQL data survives container restarts via a named Docker volume (`postgres_data`)
- **Internal networking** — services communicate over Docker's internal network

---

## Stack

### Backend
- Python · FastAPI · Pydantic
- PostgreSQL · SQLAlchemy (async via `asyncpg`)
- Uvicorn · Pytest · Docker

### AI
- LangChain (`langchain-core`, `langchain-community`)
- Groq — `llama-3.1-8b-instant` (LLM)
- Google Gemini — `gemini-embedding-2` (embeddings)
- FAISS — in-memory vector similarity search

### Frontend (Summari Web App)
- React 19 · TypeScript · Vite
- TailwindCSS v4 · shadcn/ui
- React Query (`@tanstack/react-query`) — server state & caching
- Zustand — client state (auth + theme stores)
- React Router v7 · Axios
- MSW (Mock Service Worker) — network mocking in development
- Sonner (toasts) · Lucide (icons) · react-spinners (loading)

## Key Backend Dependencies

- `fastapi` — web framework
- `uvicorn` — ASGI server
- `pydantic` — request/response validation
- `bcrypt` / `passlib` — password hashing
- `python-jose` — JWT tokens
- `langchain-groq`, `langchain-google-genai`, `langchain-community`, `faiss-cpu` — AI layer
- `httpx` — asynchronous HTTP client

## Project Structure

```
.
├── app/
│   ├── backend/
│   │   ├── server/         # FastAPI application factory (server.py)
│   │   ├── controllers/    # routers: user, note, ai, auth
│   │   ├── services/       # business logic for users, notes and AI
│   │   ├── repositories/   # persistence layer for users and notes
│   │   ├── models/         # domain models
│   │   ├── schemas/        # Pydantic schemas for requests/responses
│   │   ├── database/       # DB setup — PostgreSQL via DATABASE_URL + asyncpg
│   │   ├── core/           # auth & security helpers
│   │   ├── exceptions/     # custom exceptions
│   │   ├── ai_settings/    # LangChain clients: Groq (LLM), Gemini (embeddings), prompt enhancer
│   │   └── conftest.py     # test fixtures
│   └── frontend/
│       └── vite-app/       # Summari — React + TypeScript web app
│           └── src/
│               ├── pages/        # Login, Register, Dashboard
│               ├── components/   # Header, NotesGrid, NoteCard, NoteModal, InputAI, AI message I/O, DarkModeSwitch, ui/ (shadcn)
│               ├── contexts/     # Zustand stores: useAuthStore, useThemeStore
│               ├── api/          # axios instance + notes/ai clients
│               ├── types/        # shared TS types
│               ├── lib/          # queryClient, utils
│               └── mocks/        # MSW handlers
├── run.py                  # local backend entrypoint
├── Dockerfile
└── docker-compose.yml
```

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose — for the backend + database
- Python 3.11+ — for local backend development without Docker
- Node.js 18+ — for the frontend
- API keys for **Groq** and **Google Gemini** — for AI features

## Installation

### 1. Backend

First, provide your AI provider keys (e.g. in a `.env` file at the project root):

```
GROQ_API_KEY=your_groq_key
GOOGLE_API_KEY=your_google_key
```

#### Option A — Using Docker

Docker will set up the API and PostgreSQL automatically.

```
git clone https://github.com/kevincontri/AI-Knowledge-Base-API.git
cd AI-Knowledge-Base-API
docker compose up --build
```

This will:

- Build and start the API on `http://localhost:8000`
- Start a PostgreSQL instance with persistent storage

Open the interactive docs at `http://localhost:8000/docs`.

#### Option B — Local development (without Docker)

```
git clone https://github.com/kevincontri/AI-Knowledge-Base-API.git
cd AI-Knowledge-Base-API

python -m venv venv
venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

Configure the database connection:

```
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/ai_knowledge_db"
```

Start the server:

```
python run.py
```

Open the interactive docs at `http://127.0.0.1:8000/docs`.

### 2. Frontend (Summari)

```
cd app/frontend/vite-app
npm install
npm run dev
```

The app starts on `http://localhost:5173` and talks to the API at `http://localhost:8000`.

## Authentication

Authentication uses JWT bearer tokens and hashed passwords. Typical flow:

- Register a user via the Register page (or the auth route)
- Login with credentials to receive an `access_token`
- The token is stored client-side and sent as `Authorization: Bearer <token>` for protected endpoints
- Logout clears the token **and** the React Query cache, so notes never leak between accounts

The backend contains `app/backend/core/auth.py` and `app/backend/core/security.py` for token creation and credential verification.

## API Highlights

Routes are organized in `app/backend/controllers/`:

- **Users** — list users
- **Auth** — register user and login to receive JWT tokens
- **Notes** — create, read, update, and delete personal notes associated with an author (by user id)
- **AI Endpoints** — embeddings + FAISS vector search over the user's notes, with a grounded LLM answer (Groq) returned alongside the most relevant related notes

## Tests

Backend:

```
pytest -q
```

Frontend (type-check / build):

```
cd app/frontend/vite-app
npm run build
```

## Future Improvements

- Add refresh tokens
- Expand AI feature (AI agentic tools)
- Deploy to cloud
