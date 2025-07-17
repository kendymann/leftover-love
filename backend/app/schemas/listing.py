from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FoodItemBase(BaseModel):
    name: str
    quantity: float
    unit: str
    description: Optional[str] = None

class FoodItemCreate(FoodItemBase):
    expiry_date: datetime

class FoodItemUpdate(FoodItemBase):
    expiry_date: Optional[datetime] = None

class FoodItemResponse(FoodItemBase):
    id: int
    restaurant_id: int
    expiry_date: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True

class PickupBase(BaseModel):
    pickup_time: datetime

class PickupCreate(PickupBase):
    food_item_id: int

class PickupUpdate(BaseModel):
    status: Optional[str] = None
    rating: Optional[float] = None
    impact: Optional[dict] = None

class PickupResponse(PickupBase):
    id: int
    status: str
    food_item_id: int
    restaurant_id: int
    charity_id: int
    rating: Optional[float] = None
    impact: Optional[dict] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
