from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict
from datetime import datetime


class BusinessImageOut(BaseModel):
    id: int
    image_url: str
    uploaded_at: datetime

    model_config = {"from_attributes": True}


class BusinessBase(BaseModel):
    name: str
    category: str
    description: str
    address: str
    city: str
    state: str
    country: str
    postal_code: str
    phone: str
    email: EmailStr
    website: Optional[str] = None
    opening_hours: Optional[Dict[str, str]] = None
    services: Optional[List[str]] = None


class BusinessCreate(BusinessBase):
    pass


class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    opening_hours: Optional[Dict[str, str]] = None
    services: Optional[List[str]] = None


class BusinessOut(BusinessBase):
    id: int
    owner_id: int
    logo_url: Optional[str] = None
    images: List[BusinessImageOut] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}
