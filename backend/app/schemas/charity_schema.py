from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class CharityBase(BaseModel):
    name: str
    address: str
    phone: str
    email: EmailStr
    description: Optional[str] = None

class CharityCreate(CharityBase):
    pass

class CharityUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    description: Optional[str] = None

class CharityResponse(CharityBase):
    id: int
    user_id: int
    total_pickups: int
    people_helped: int
    food_saved_kg: float
    created_at: datetime
    
    class Config:
        from_attributes = True
