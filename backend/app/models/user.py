"""User model for authentication and user management."""

import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base


class UserType(enum.Enum):
    """Enum for user types in the system."""
    RESTAURANT = "restaurant"
    CHARITY = "charity"


class User(Base):
    """User model for both restaurants and charities."""
    __tablename__ = "fastapi_user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    user_type = Column(Enum(UserType))
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    restaurants = relationship("Restaurant", back_populates="owner")
    charity = relationship("Charity", back_populates="owner", uselist=False) 