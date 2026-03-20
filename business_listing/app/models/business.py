from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Basic info
    name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=False)

    # Location
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)

    # Contact
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    website = Column(String, nullable=True)

    # Details
    opening_hours = Column(JSON, nullable=True)   # e.g. {"Mon": "9am-5pm", ...}
    services = Column(JSON, nullable=True)         # e.g. ["Haircut", "Coloring"]

    # Media
    logo_url = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="businesses")
    images = relationship("BusinessImage", back_populates="business", cascade="all, delete-orphan")


class BusinessImage(Base):
    __tablename__ = "business_images"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=False)
    image_url = Column(String, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    business = relationship("Business", back_populates="images")
