from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from backend.app.database import get_db
from backend.app.models import FoodItem, Pickup, Charity
from backend.app.schemas import PickupRequest, PickupResponse, StatsResponse, FoodItemResponse
from typing import List

router = APIRouter()

# List all available food items
@router.get("/charities/available-food", response_model=List[FoodItemResponse])
def list_available_food(db: Session = Depends(get_db)):
    return db.query(FoodItem).all()

# Request a pickup
@router.post("/charities/pickups/request", response_model=PickupResponse)
def request_pickup(pickup_request: PickupRequest, db: Session = Depends(get_db)):
    new_pickup = Pickup(**pickup_request.dict(), status="pending")
    db.add(new_pickup)
    db.commit()
    db.refresh(new_pickup)
    return new_pickup

# Get scheduled pickups
@router.get("/charities/pickups/scheduled", response_model=List[PickupResponse])
def get_scheduled_pickups(db: Session = Depends(get_db)):
    return db.query(Pickup).filter(Pickup.status == "confirmed").all()

# Get collection statistics
@router.get("/charities/stats", response_model=StatsResponse)
def get_collection_statistics(db: Session = Depends(get_db)):
    total_pickups = db.query(Pickup).count()
    people_helped = sum(p.impact['peopleHelped'] for p in db.query(Pickup).filter(Pickup.status == "completed"))
    food_saved = sum(p.impact['foodSaved'] for p in db.query(Pickup).filter(Pickup.status == "completed"))
    avg_rating = db.query(Pickup).filter(Pickup.status == "completed").with_entities(func.avg(Pickup.rating)).scalar()
    return {"totalPickups": total_pickups, "peopleHelped": people_helped, "foodSaved": food_saved, "averageRating": avg_rating}