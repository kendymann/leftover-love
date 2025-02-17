# Description: Database models for the application.
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

# Define the User model
Base = declarative_base()

class User(Base):
    # Define the table name
    __tablename__ = "users"
    # Define the columns
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    user_type = Column(String, nullable=False)

# Define the FoodItem model
class FoodItem(Base):
    # Define the table name
    __tablename__ = "food_items"
    # Define the columns
    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    available_date = Column(DateTime, nullable=False)
    available_time = Column(String, nullable=False)
    status = Column(String, default="available")
    # Define the relationship
    restaurant = relationship("User")

# Define the Pickup model
class Pickup(Base):
    # Define the table name
    __tablename__ = "pickups"
    # Define the columns
    id = Column(Integer, primary_key=True, index=True)
    food_item_id = Column(Integer, ForeignKey("food_items.id"))
    charity_id = Column(Integer, ForeignKey("users.id"))
    pickup_date = Column(DateTime, nullable=False)
    # Define the relationship
    food_item = relationship("FoodItem")
    charity = relationship("User")




