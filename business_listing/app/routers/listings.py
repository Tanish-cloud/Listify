from fastapi import APIRouter, Depends, UploadFile, File, status
from sqlalchemy.orm import Session
from typing import List
from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.business import BusinessCreate, BusinessUpdate, BusinessOut, BusinessImageOut
from app.services import business_service

router = APIRouter(prefix="/listings", tags=["Listings"])


@router.get("", response_model=List[BusinessOut])
def list_all(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return business_service.get_all_businesses(db, skip, limit)


@router.get("/me", response_model=List[BusinessOut])
def my_listings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return business_service.get_businesses_by_owner(db, current_user.id)


@router.get("/{business_id}", response_model=BusinessOut)
def get_business(business_id: int, db: Session = Depends(get_db)):
    return business_service.get_business_by_id(db, business_id)


@router.post("", response_model=BusinessOut, status_code=status.HTTP_201_CREATED)
def create(data: BusinessCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return business_service.create_business(db, data, current_user.id)


@router.put("/{business_id}", response_model=BusinessOut)
def update(business_id: int, data: BusinessUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return business_service.update_business(db, business_id, data, current_user.id)


@router.delete("/{business_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(business_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    business_service.delete_business(db, business_id, current_user.id)


@router.post("/{business_id}/images", response_model=BusinessImageOut)
async def upload_image(
    business_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await business_service.upload_business_image(db, business_id, file, current_user.id)


@router.post("/{business_id}/logo", response_model=BusinessOut)
async def upload_logo(
    business_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await business_service.upload_business_image(db, business_id, file, current_user.id, is_logo=True)
