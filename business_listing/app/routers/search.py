from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.dependencies import get_db
from app.schemas.business import BusinessOut
from app.services import business_service

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("", response_model=List[BusinessOut])
def search(q: str = Query(..., min_length=1, description="Search by business name"), db: Session = Depends(get_db)):
    return business_service.search_businesses(db, q)


@router.get("/filter", response_model=List[BusinessOut])
def filter_category(category: str = Query(..., description="Filter by category"), db: Session = Depends(get_db)):
    return business_service.filter_by_category(db, category)
