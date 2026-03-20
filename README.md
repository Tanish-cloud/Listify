# 🚀 Listify – Business Listing Platform

## 🌐 Live Demo

* 🔗 Frontend: https://your-vercel-url.vercel.app
* ⚙️ Backend: https://tv1089-listify.hf.space
* 📄 API Docs: https://tv1089-listify.hf.space/docs

---

## 📌 Overview

Listify is a full-stack Business Listing Platform that allows users to discover, create, and manage business listings.

It includes user authentication, business management features, and a responsive UI built with modern web technologies.

---

## ✨ Features

### 🔐 Authentication

* User registration
* Secure login (JWT-based)
* Token storage using localStorage

### 🏢 Business Listings

* Create and manage listings
* View all businesses
* Personalized “My Listings” section
* Upload logos/images

### 🔍 Search & Discovery

* Browse all listings
* Filter/search functionality

### 📱 Responsive UI

* Mobile-friendly design
* Clean and modern interface

---

## 🛠️ Tech Stack

### 🔹 Frontend

* HTML, CSS, JavaScript (Vite)
* Fetch API for backend communication
* Deployed on **Vercel**

### 🔹 Backend

* FastAPI (Python)
* SQLAlchemy (ORM)
* Alembic (Database migrations)
* JWT Authentication
* Deployed on **Hugging Face Spaces (Docker)**

---

## 📂 Project Structure

```
listifyy/
│
├── frontend/                # Frontend (Vercel)
│   ├── css/
│   ├── js/
│   │   └── app.js
│   ├── pages/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── business_listing/        # Backend source code
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── alembic/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── business_listing.db
│
└── Listify/                 # Deployed backend (Hugging Face repo)
```

---

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/listify.git
cd listifyy
```

---

### 2️⃣ Backend Setup

```
cd business_listing

python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt

uvicorn app.main:app --reload
```

👉 API runs on:
http://127.0.0.1:8000/docs

---

### 3️⃣ Frontend Setup

```
cd frontend

npm install
npm run dev
```

👉 Frontend runs on:
http://localhost:5173

---

## 🔗 API Endpoints

### Auth

* `POST /auth/register` → Register user
* `POST /auth/login` → Login user

### Listings

* `GET /listings` → Get all listings
* `POST /listings` → Create listing
* `GET /listings/me` → User listings

---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)

```
VITE_API_URL=https://tv1089-listify.hf.space
```

---

## 🚀 Deployment

### Backend

* Dockerized FastAPI app
* Hosted on Hugging Face Spaces

### Frontend

* Built with Vite
* Hosted on Vercel

---

## ⚠️ Notes

* SQLite database is used (data may reset on redeploy)
* For production, use PostgreSQL or MongoDB

---

## 🔮 Future Improvements

* ⭐ Reviews & ratings
* 🗺️ Map integration
* 🔎 Advanced search filters
* 📊 Analytics dashboard

---

## 👨‍💻 Author

**Tanish Verma**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
