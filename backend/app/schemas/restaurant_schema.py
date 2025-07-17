from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class RestaurantBase(BaseModel):
    name: str
    address: str
    phone: str
    email: EmailStr

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

class RestaurantResponse(RestaurantBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class RestaurantStatsResponse(BaseModel):
    total_listings: int
    total_pickups: int
    food_saved_kg: float
    people_helped: int
