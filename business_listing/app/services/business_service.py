import os
import uuid
import aiofiles
from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.business import Business, BusinessImage
from app.schemas.business import BusinessCreate, BusinessUpdate
from app.config import settings


def get_all_businesses(db: Session, skip: int = 0, limit: int = 20):
    return db.query(Business).offset(skip).limit(limit).all()


def get_business_by_id(db: Session, business_id: int):
    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return business


def get_businesses_by_owner(db: Session, owner_id: int):
    return db.query(Business).filter(Business.owner_id == owner_id).all()


def search_businesses(db: Session, q: str):
    return (
        db.query(Business)
        .filter(Business.name.ilike(f"%{q}%"))
        .all()
    )


def filter_by_category(db: Session, category: str):
    return db.query(Business).filter(Business.category.ilike(f"%{category}%")).all()


def create_business(db: Session, data: BusinessCreate, owner_id: int) -> Business:
    business = Business(**data.model_dump(), owner_id=owner_id)
    db.add(business)
    db.commit()
    db.refresh(business)
    return business


def update_business(db: Session, business_id: int, data: BusinessUpdate, owner_id: int) -> Business:
    business = get_business_by_id(db, business_id)
    if business.owner_id != owner_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this listing")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(business, field, value)
    db.commit()
    db.refresh(business)
    return business


def delete_business(db: Session, business_id: int, owner_id: int):
    business = get_business_by_id(db, business_id)
    if business.owner_id != owner_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this listing")
    db.delete(business)
    db.commit()


async def upload_business_image(db: Session, business_id: int, file: UploadFile, owner_id: int, is_logo: bool = False):
    business = get_business_by_id(db, business_id)
    if business.owner_id != owner_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    allowed_types = {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, and WEBP images are allowed")

    ext = file.filename.rsplit(".", 1)[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    save_dir = os.path.join(settings.UPLOAD_DIR, str(business_id))
    os.makedirs(save_dir, exist_ok=True)
    save_path = os.path.join(save_dir, filename)

    async with aiofiles.open(save_path, "wb") as out_file:
        content = await file.read()
        await out_file.write(content)

    file_url = f"/{save_path}"

    if is_logo:
        business.logo_url = file_url
        db.commit()
        db.refresh(business)
        return business
    else:
        img = BusinessImage(business_id=business_id, image_url=file_url)
        db.add(img)
        db.commit()
        db.refresh(img)
        return img
