from pydantic import BaseModel, EmailStr
from typing import Optional, Dict
from datetime import datetime

class FoodItemBase(BaseModel):
    name: str
    quantity: float
    unit: str
    expiry_date: datetime
    description: Optional[str] = None

class FoodItemCreate(FoodItemBase):
    restaurant_id: int

class FoodItemUpdate(BaseModel):
    name: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    expiry_date: Optional[datetime] = None
    description: Optional[str] = None

class FoodItemResponse(FoodItemBase):
    id: int
    restaurant_id: int

    class Config:
        from_attributes = True

class PickupRequest(BaseModel):
    food_item_id: int
    charity_id: int
    pickup_time: datetime

class PickupResponse(BaseModel):
    id: int
    status: str
    pickup_time: datetime
    food_item_id: int
    restaurant_id: int
    charity_id: int
    rating: Optional[float] = None
    impact: Optional[Dict] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class StatsResponse(BaseModel):
    totalPickups: int
    peopleHelped: int
    foodSaved: float
    averageRating: Optional[float] = None 