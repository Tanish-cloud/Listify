# Business Listing Platform — FastAPI Backend

A business listing system where **clients** (business owners) can register and manage listings, and **visitors** can browse and search them.

---

## Tech Stack
- **FastAPI** — web framework
- **SQLAlchemy** — ORM
- **Alembic** — database migrations
- **PostgreSQL** (or SQLite for dev)
- **JWT** — authentication via `python-jose`
- **Passlib / bcrypt** — password hashing

---

## Project Structure
```
business_listing/
├── app/
│   ├── main.py               # App entry point
│   ├── config.py             # Settings from .env
│   ├── database.py           # DB engine + session
│   ├── dependencies.py       # get_db, get_current_user
│   ├── models/
│   │   ├── user.py
│   │   └── business.py
│   ├── schemas/
│   │   ├── user.py
│   │   └── business.py
│   ├── routers/
│   │   ├── auth.py           # /auth/register, /auth/login
│   │   ├── listings.py       # /listings CRUD + image upload
│   │   └── search.py         # /search, /search/filter
│   └── services/
│       ├── auth_service.py
│       └── business_service.py
├── alembic/                  # DB migrations
├── uploads/                  # Uploaded images (auto-created)
├── requirements.txt
├── alembic.ini
├── DATABASE_SCHEMA.md
├── API_DOCS.md
└── .env.example
```

---

## Setup

### 1. Clone and create virtual environment
```bash
git clone <your-repo>
cd business_listing
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
pip install pydantic-settings   # settings management
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL and SECRET_KEY
```

For quick local dev with SQLite (no Postgres needed), leave `DATABASE_URL` as:
```
DATABASE_URL=sqlite:///./business_listing.db
```

### 4. Run the server
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`  
Interactive docs (Swagger UI): `http://localhost:8000/docs`  
ReDoc: `http://localhost:8000/redoc`

---

## Database migrations (PostgreSQL)

Once you switch to PostgreSQL, use Alembic instead of `create_all`:

```bash
# Generate initial migration
alembic revision --autogenerate -m "initial"

# Apply migrations
alembic upgrade head

# Rollback one step
alembic downgrade -1
```

---

## API Summary

| Method | Endpoint                          | Auth     | Description              |
|--------|-----------------------------------|----------|--------------------------|
| POST   | /auth/register                    | Public   | Register a client        |
| POST   | /auth/login                       | Public   | Get JWT token            |
| GET    | /listings                         | Public   | Browse all listings      |
| GET    | /listings/{id}                    | Public   | View single listing      |
| GET    | /search?q=                        | Public   | Search by name           |
| GET    | /search/filter?category=          | Public   | Filter by category       |
| GET    | /listings/me                      | Client   | My listings              |
| POST   | /listings                         | Client   | Create listing           |
| PUT    | /listings/{id}                    | Client   | Update listing           |
| DELETE | /listings/{id}                    | Client   | Delete listing           |
| POST   | /listings/{id}/images             | Client   | Upload image             |
| POST   | /listings/{id}/logo               | Client   | Upload logo              |

See `API_DOCS.md` for full request/response details.

---

## Optional Enhancements (Bonus)
- [ ] Business ratings and reviews — add `Review` model with `rating` + `comment`
- [ ] Featured listings — add `is_featured` boolean field on `Business`
- [ ] Map integration — store `latitude` / `longitude` and return with listing
- [ ] Business verification — add `is_verified` flag, admin-only endpoint to verify
