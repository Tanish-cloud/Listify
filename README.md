# 🚀 Listify – AI-Powered Business Listing Platform

<div align="center">

![Listify](https://img.shields.io/badge/Listify-Business%20Platform-6366f1?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge\&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge\&logo=postgresql)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge\&logo=vercel)
![HuggingFace](https://img.shields.io/badge/Backend-HuggingFace%20Spaces-FFD21E?style=for-the-badge\&logo=huggingface)

### Discover Businesses Using Natural Language — Powered by Semantic AI Search

[🌐 Live Demo](https://listify-xi-peach.vercel.app) • [⚙️ API Docs](https://tv1089-listify.hf.space/docs) • [🤗 Hugging Face Space](https://huggingface.co/spaces/tv1089/Listify)

</div>

---

## 📌 Overview

Listify is a modern full-stack business listing platform that enables users to discover businesses using natural language. Instead of relying solely on keywords, users can search with queries such as:

* *"Cozy cafe with free Wi-Fi for remote work"*
* *"Emergency plumber available on weekends"*
* *"Affordable gym with personal trainers"*

Powered by semantic AI search, Listify understands the intent behind user queries and returns the most relevant business listings.

The platform is built using FastAPI, PostgreSQL (Supabase), FAISS vector search, Sentence Transformers, and a responsive frontend deployed on Vercel.

---

## ✨ Key Features

### 🤖 AI-Powered Semantic Search

* Natural language business discovery using **sentence-transformers (all-MiniLM-L6-v2)**
* High-performance vector similarity search with **FAISS**
* Dynamic relevance score badges showing match percentages
* Automatic index rebuilding whenever listings are created, updated, or deleted
* Suggested example queries for instant exploration

### 🔐 Secure Authentication

* User registration and login
* JWT-based authentication
* Protected endpoints for listing management

### 🏢 Business Listings Management

* Create, update, and delete listings
* Upload business logos and images
* Category filtering and keyword search
* Personalized "My Listings" dashboard

### 📱 Responsive User Experience

* Modern dark-themed interface
* Mobile-friendly design
* Smooth animations and intuitive navigation

---

## 🛠️ Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| Frontend       | HTML, CSS, Vanilla JavaScript, Vite              |
| Backend        | FastAPI, SQLAlchemy, Alembic                     |
| Authentication | JWT                                              |
| Database       | Supabase (PostgreSQL)                            |
| AI Search      | Sentence Transformers + FAISS                    |
| Deployment     | Vercel (Frontend), Hugging Face Spaces (Backend) |

---

## 🔍 How AI Search Works

```text
User Query (Natural Language)
            ↓
Sentence Transformer
(all-MiniLM-L6-v2)
            ↓
384-Dimensional Embedding
            ↓
FAISS Vector Similarity Search
            ↓
Top-K Matching Businesses
            ↓
Relevance Score Calculation
            ↓
Ranked Search Results
```

Business embeddings are generated from:

```text
Business Name
+ Category
+ City
+ Description
+ Services
```

### Index Management

The FAISS index is:

* Built automatically when the application starts
* Rebuilt after every create, update, or delete operation
* Manually rebuildable through:

```http
POST /listings/search/ai/reindex
```

---

## 📂 Project Structure

```text
listifyy/
│
├── frontend/
│   ├── css/
│   ├── js/
│   │   └── app.js
│   ├── pages/
│   │   └── listings.html
│   ├── index.html
│   └── vite.config.js
│
└── business_listing/
    ├── app/
    │   ├── models/
    │   ├── routers/
    │   │   ├── auth.py
    │   │   ├── listings.py
    │   │   ├── search.py
    │   │   └── router_ai_search.py
    │   ├── schemas/
    │   ├── services/
    │   ├── ai_search.py
    │   ├── database.py
    │   ├── config.py
    │   └── main.py
    │
    ├── requirements.txt
    └── Dockerfile
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register a new user         |
| POST   | `/auth/login`    | Login and receive JWT token |

### Listings

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| GET    | `/listings`      | Retrieve all listings            |
| POST   | `/listings`      | Create a listing                 |
| PUT    | `/listings/{id}` | Update a listing                 |
| DELETE | `/listings/{id}` | Delete a listing                 |
| GET    | `/listings/me`   | Retrieve current user's listings |

### AI Search

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/listings/search/ai`         | Semantic business search |
| POST   | `/listings/search/ai/reindex` | Rebuild FAISS index      |

---

## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tanish-cloud/Listify.git
cd listifyy
```

### 2. Backend Setup

```bash
cd business_listing

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
DATABASE_URL=sqlite:///./business_listing.db
SECRET_KEY=your-secret-key
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend

```env
VITE_API_URL=https://tv1089-listify.hf.space
```

---

## 🚀 Deployment

| Component | Platform            |
| --------- | ------------------- |
| Frontend  | Vercel              |
| Backend   | Hugging Face Spaces |
| Database  | Supabase PostgreSQL |

Deployment is fully automated through GitHub integration.

---

## 🔮 Future Roadmap

* ⭐ Business reviews and ratings
* 🗺️ Interactive map integration
* 📊 Analytics dashboard for business owners
* 🔔 Email notifications
* 🌍 Location-aware semantic search
* 📍 Geospatial search and distance filtering
* 🧠 Personalized business recommendations

---

## 👨‍💻 Author

### Tanish Verma

**B.Tech Computer Science Engineering (SRMIST Chennai)**
**CGPA: 9.49**

GitHub: https://github.com/Tanish-cloud

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.

**Built with FastAPI, Supabase, FAISS, and ❤️**
