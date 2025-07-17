"""Restaurant and food management models."""

from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.models.base import Base


class Restaurant(Base):
    """Restaurant profile model."""
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    phone = Column(String)
    email = Column(String, unique=True, index=True)
    user_id = Column(Integer, ForeignKey("fastapi_user.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    owner = relationship("User", back_populates="restaurants")
    food_items = relationship("FoodItem", back_populates="restaurant")
    pickups = relationship("Pickup", back_populates="restaurant")


class FoodItem(Base):
    """Food item model for donations."""
    __tablename__ = "food_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    quantity = Column(Float)
    unit = Column(String)
    expiry_date = Column(DateTime)
    description = Column(String, nullable=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    restaurant = relationship("Restaurant", back_populates="food_items")
    pickup = relationship("Pickup", back_populates="food_item")


class Pickup(Base):
    """Pickup scheduling and tracking model."""
    __tablename__ = "pickups"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, default="scheduled")  # scheduled, completed, cancelled
    pickup_time = Column(DateTime)
    food_item_id = Column(Integer, ForeignKey("food_items.id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    charity_id = Column(Integer, ForeignKey("charities.id"))
    rating = Column(Float, nullable=True)
    impact = Column(JSON, nullable=True)  # Store impact metrics
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    food_item = relationship("FoodItem", back_populates="pickup")
    restaurant = relationship("Restaurant", back_populates="pickups")
    charity = relationship("Charity", back_populates="pickups") 