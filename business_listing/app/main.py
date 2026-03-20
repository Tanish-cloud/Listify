from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from app.database import engine, Base
from app.models import user, business  # ensure models are registered
from app.routers import auth, listings, search
from app.config import settings

# Create all tables on startup (use Alembic in production)
Base.metadata.create_all(bind=engine)

# Ensure upload dir exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="Business Listing Platform",
    description="API for listing and discovering businesses",
    version="1.0.0",
)

# CORS — adjust origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files as static
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(listings.router)
app.include_router(search.router)


@app.get("/", tags=["Health"])
def root():
    return {"message": "Business Listing API is running", "docs": "/docs"}
