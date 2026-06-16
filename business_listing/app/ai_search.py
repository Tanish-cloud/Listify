"""
ai_search.py — Semantic search for Listify businesses using sentence-transformers + FAISS.

Drop this file into: business_listing/app/
"""

import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from sqlalchemy.orm import Session
from typing import List, Dict, Any

# Load model once at import time (cached for the app lifetime)
_model = SentenceTransformer("all-MiniLM-L6-v2")

# In-memory index (rebuilt on startup / on demand)
_faiss_index: faiss.IndexFlatL2 | None = None
_business_records: List[Dict[str, Any]] = []


def _build_embedding_text(business) -> str:
    """
    Combine relevant fields into a single string for embedding.
    Richer text → better semantic matches.
    """
    services = ""
    if business.services and isinstance(business.services, list):
        services = ", ".join(business.services)

    parts = [
        business.name,
        f"{business.category} in {business.city}, {business.state}",
        business.description,
    ]
    if services:
        parts.append(f"Services: {services}")

    return ". ".join(filter(None, parts))


def build_index(db: Session) -> None:
    """
    Load all businesses from DB, compute embeddings, build FAISS index.
    Call this once at app startup (and after any listing is added/updated).
    """
    global _faiss_index, _business_records

    # Import here to avoid circular imports — adjust path if your models live elsewhere
    from app.models.business import Business  # noqa: E402

    businesses = db.query(Business).all()

    if not businesses:
        _faiss_index = None
        _business_records = []
        return

    texts = [_build_embedding_text(b) for b in businesses]
    embeddings = _model.encode(texts, convert_to_numpy=True, show_progress_bar=False)

    # L2 (Euclidean) index — works well for MiniLM embeddings
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings.astype(np.float32))

    _faiss_index = index
    _business_records = [
        {
            "id": b.id,
            "name": b.name,
            "category": b.category,
            "description": b.description,
            "city": b.city,
            "state": b.state,
            "country": b.country,
            "address": b.address,
            "phone": b.phone,
            "email": b.email,
            "website": b.website,
            "services": b.services,
            "opening_hours": b.opening_hours,
            "logo_url": b.logo_url,
        }
        for b in businesses
    ]

    print(f"[AI Search] Index built with {len(businesses)} businesses.")


def semantic_search(query: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """
    Search businesses by natural language query.
    Returns top_k results sorted by relevance (closest L2 distance first).
    """
    if _faiss_index is None or not _business_records:
        return []

    query_embedding = _model.encode([query], convert_to_numpy=True).astype(np.float32)
    distances, indices = _faiss_index.search(query_embedding, min(top_k, len(_business_records)))

    results = []
    for dist, idx in zip(distances[0], indices[0]):
        if idx == -1:
            continue
        record = dict(_business_records[idx])
        # Normalise distance to a 0–1 similarity score (lower distance = higher score)
        record["relevance_score"] = round(float(1 / (1 + dist)), 4)
        results.append(record)

    return results