# AI-Powered Document & Multimedia Q&A Web Application

A full-stack web application that allows users to upload PDF, audio, and video files and interact with an AI-powered chatbot to ask questions, generate summaries, and extract timestamps from media files.

---

## Live Demo

> Video Walkthrough: [Add your YouTube/Google Drive link here]

---

## Features

- Upload PDF documents, audio, and video files
- AI-powered chatbot to ask questions based on uploaded content
- Document and media summarization
- Timestamp extraction from audio/video files
- Play button to jump to relevant portions of media
- JWT-based user authentication
- Semantic search using FAISS vector store
- Whisper-based audio/video transcription

---

## Tech Stack

### Backend
- **FastAPI** — Python web framework
- **LangChain** — LLM orchestration
- **Google Gemini** — LLM + embeddings (gemini-2.5-flash-lite + gemini-embedding-001)
- **FAISS** — Vector similarity search
- **Whisper** — Audio/video transcription
- **MongoDB** — Database
- **Redis** — Caching
- **JWT** — Authentication
- **Docker** — Containerization

### Frontend
- **React** — UI framework
- **Tailwind CSS** — Styling
- **Axios** — HTTP client
- **React Router** — Navigation

---

## Project Structure

```
project/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── auth.py        # Login, Register
│   │   │       ├── upload.py      # File upload
│   │   │       ├── chat.py        # Q&A chatbot
│   │   │       ├── summary.py     # Document summary
│   │   │       └── media.py       # Timestamps
│   │   ├── core/
│   │   │   ├── config.py          # Environment settings
│   │   │   ├── database.py        # MongoDB connection
│   │   │   └── security.py        # JWT utilities
│   │   ├── models/
│   │   │   └── document_model.py  # Data models
│   │   ├── services/
│   │   │   ├── llm_service.py     # Gemini LLM + Q&A
│   │   │   ├── vector_service.py  # FAISS vector store
│   │   │   ├── pdf_service.py     # PDF text extraction
│   │   │   ├── whisper_service.py # Audio/video transcription
│   │   │   └── summary_service.py # Summarization
│   │   └── tests/
│   │       ├── test_upload.py
│   │       ├── test_chat.py
│   │       └── test_summary.py
│   ├── main.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── UploadBox.jsx
│   │   │   ├── SummaryBox.jsx
│   │   │   ├── MediaPlayer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Setup & Installation

### Prerequisites

- Python 3.10+
- Node.js 18+
- MongoDB running locally or MongoDB Atlas URI
- Redis running locally
- FFmpeg installed (for audio/video processing)
- Google Gemini API key — https://aistudio.google.com

### Install FFmpeg (Windows)

Download from https://ffmpeg.org/download.html and add to system PATH.

---

### Backend Setup

```bash
# 1. Go to backend folder
cd backend

# 2. Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create .env file
cp .env.example .env
# Fill in your values (see Environment Variables section)

# 5. Start server
uvicorn main:app --reload
```

Server runs at: http://localhost:8000

---

### Frontend Setup

```bash
# 1. Go to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Frontend runs at: http://localhost:5173

---

### Run with Docker Compose (Recommended)

```bash
# From root project folder
docker-compose up --build
```

This starts:
- Backend at http://localhost:8000
- Frontend at http://localhost:5173
- MongoDB at localhost:27017
- Redis at localhost:6379

---

## Environment Variables

Create a `.env` file in the `backend/` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=qa_app
JWT_SECRET=your_secret_key_here
REDIS_URL=redis://localhost:6379
```

---

## API Documentation

Base URL: `http://localhost:8000`

### Auth

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | `{ email, password, name }` |
| POST | `/api/auth/login` | Login user | `{ email, password }` |

**Login Response:**
```json
{
  "access_token": "eyJhbGci...",
  "token_type": "bearer"
}
```

---

### Upload

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload PDF, audio, or video file |
| GET | `/api/upload/metadata` | Get uploaded file info + segments |
| GET | `/api/upload/media/{filename}` | Stream media file for playback |

**Upload Response:**
```json
{
  "message": "File uploaded successfully",
  "file_type": "pdf",
  "text_length": 4523,
  "segments_count": 0,
  "preview": "First 500 chars..."
}
```

---

### Chat

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/chat` | Ask a question | `{ "question": "What is this about?" }` |

**Response:**
```json
{
  "answer": "Based on the document, this is about..."
}
```

---

### Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/summary` | Generate summary of uploaded file |

**Response:**
```json
{
  "filename": "document.pdf",
  "file_type": "pdf",
  "summary": "## Main Topic\n..."
}
```

---

### Media (Timestamps)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/media/timestamps?topic=python` | Get timestamps for a topic |

**Response:**
```json
{
  "topic": "python",
  "filename": "lecture.mp4",
  "timestamps": [
    { "start": 45.2, "end": 58.1, "text": "Python is used here..." }
  ]
}
```

---

## Running Tests

```bash
cd backend

# Run all tests
pytest app/tests/ -v

# Run with coverage report
pytest app/tests/ --cov=app --cov-report=term-missing

# Run with HTML coverage report
pytest app/tests/ --cov=app --cov-report=html
```

---

## CI/CD Pipeline

GitHub Actions runs automatically on every push to `main` or `dev`:

1. Sets up Python 3.11
2. Installs all dependencies
3. Runs test suite with coverage check
4. Builds Docker image

Pipeline config: `.github/workflows/ci.yml`

---

## Walkthrough Video Script

Use this as your script when recording:

### Introduction (30 seconds)
> "Hi, I built an AI-powered Document and Multimedia Q&A web application using FastAPI, React, and Google Gemini. Let me walk you through the features and code."

### Demo Flow (3-4 minutes)

1. **Show the Login page**
   > "Users must register and login. JWT tokens are used for authentication. Without login, the dashboard is not accessible — protected routes redirect to login."

2. **Register a new account**
   > "I'll register a new user. The password is hashed using bcrypt and stored in MongoDB."

3. **Upload a PDF**
   > "After login, I upload a PDF file. The backend extracts text using PyPDF, creates embeddings using Gemini's embedding model, and stores them in a FAISS vector index."

4. **Ask a question**
   > "Now I ask a question. The backend performs semantic similarity search on the FAISS index, retrieves relevant chunks, and passes them as context to Gemini LLM which generates the answer."

5. **Generate Summary**
   > "With one click, the entire document is summarized using Gemini — showing main topics, key points, and conclusion."

6. **Upload an Audio/Video file**
   > "For audio or video, Whisper transcribes the content and extracts timestamps for each segment."

7. **Search timestamps**
   > "I type a topic and it finds relevant timestamps. The Play button jumps directly to that moment in the audio/video."

### Code Walkthrough (2-3 minutes)

1. **Show `main.py`** — FastAPI app setup, CORS, routers
2. **Show `llm_service.py`** — FAISS search + Gemini Q&A flow
3. **Show `vector_service.py`** — How embeddings are created and stored
4. **Show `whisper_service.py`** — Transcription + timestamp extraction
5. **Show `ProtectedRoute.jsx`** — Frontend auth guard
6. **Show `MediaPlayer.jsx`** — Play button + timestamp search UI
7. **Show GitHub Actions** — CI/CD pipeline running tests

### Closing (15 seconds)
> "The app is fully dockerized with Docker Compose, has a CI/CD pipeline on GitHub Actions, and uses FAISS for semantic vector search as a bonus feature. Thank you!"

---

## Bonus Features Implemented

- FAISS vector search for semantic similarity
- JWT authentication with protected routes
- Docker Compose multi-container setup
- GitHub Actions CI/CD pipeline
- Whisper-based transcription with timestamps
- Media player with topic-based timestamp search

---

## Author

Your Name — Kaushiki Singh — https://github.com/kaushiki2104 # AI-Powered-Document-Multimedia-Q-A-Web-Application
