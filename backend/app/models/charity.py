from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base

class Charity(Base):
    __tablename__ = "charities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    phone = Column(String)
    email = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("fastapi_user.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    owner = relationship("User", back_populates="charity")
    pickups = relationship("Pickup", back_populates="charity")
    
    # Statistics
    total_pickups = Column(Integer, default=0)
    people_helped = Column(Integer, default=0)
    food_saved_kg = Column(Float, default=0.0) 