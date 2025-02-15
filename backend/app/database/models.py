from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    user_type = Column(String, nullable=False)  # "restaurant" or "charity"

class FoodItem(Base):
    __tablename__ = "food_items"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    available_date = Column(DateTime, nullable=False)
    available_time = Column(String, nullable=False)
    status = Column(String, default="available")

    restaurant = relationship("User")

class Pickup(Base):
    __tablename__ = "pickups"

    id = Column(Integer, primary_key=True, index=True)
    food_item_id = Column(Integer, ForeignKey("food_items.id"))
    charity_id = Column(Integer, ForeignKey("users.id"))
    pickup_date = Column(DateTime, nullable=False)

    food_item = relationship("FoodItem")
    charity = relationship("User")
