"""
router_ai_search.py — FastAPI router for AI semantic search.

Drop this file into: business_listing/app/routers/
Then register it in main.py (see instructions at bottom of this file).
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db          # adjust import path to match your project
from app.ai_search import semantic_search, build_index

router = APIRouter(prefix="/listings", tags=["AI Search"])


# ── Request / Response models ──────────────────────────────────────────────────

class AISearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5


class BusinessResult(BaseModel):
    id: int
    name: str
    category: str
    description: str
    city: str
    state: str
    country: str
    address: str
    phone: str
    email: str
    website: Optional[str]
    services: Optional[list]
    logo_url: Optional[str]
    relevance_score: float

    class Config:
        from_attributes = True


class AISearchResponse(BaseModel):
    query: str
    results: List[BusinessResult]
    total: int


# ── Endpoints ──────────────────────────────────────────────────────────────────

@router.post("/search/ai", response_model=AISearchResponse)
def ai_search(
    payload: AISearchRequest,
    db: Session = Depends(get_db),
):
    """
    Natural language search over business listings using semantic similarity.

    Example queries:
    - "I need a good salon that does hair coloring near me"
    - "find me a cafe with good wifi to work from"
    - "emergency plumber available on weekends"
    """
    query = payload.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    top_k = max(1, min(payload.top_k or 5, 20))  # clamp between 1 and 20

    results = semantic_search(query, top_k=top_k)

    return AISearchResponse(
        query=query,
        results=results,
        total=len(results),
    )


@router.post("/search/ai/reindex", tags=["Admin"])
def reindex(db: Session = Depends(get_db)):
    """
    Rebuild the FAISS index from the current DB state.
    Call this after bulk-adding new listings.
    Protected endpoint — add your auth dependency in production.
    """
    build_index(db)
    return {"message": "Index rebuilt successfully."}


# ── Registration instructions ──────────────────────────────────────────────────
#
# In business_listing/app/main.py, add:
#
#   from app.routers.router_ai_search import router as ai_router
#   from app.ai_search import build_index
#
#   app.include_router(ai_router)
#
#   @app.on_event("startup")
#   def startup_event():
#       db = next(get_db())
#       build_index(db)
#
# ──────────────────────────────────────────────────────────────────────────────