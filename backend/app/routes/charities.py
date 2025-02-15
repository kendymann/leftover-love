from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from ..database.session import get_db
from ..models.charity import Charity
from ..models.restaurant import FoodItem, Pickup
from ..schemas.charity import CharityCreate, CharityUpdate, CharityResponse
from ..schemas.restaurant import FoodItemResponse, PickupResponse, PickupRequest, StatsResponse
from ..core.security import oauth2_scheme
from typing import List

router = APIRouter()

# List all available food items
@router.get("/available-food", response_model=List[FoodItemResponse])
def list_available_food(db: Session = Depends(get_db)):
    return db.query(FoodItem).all()

# Request a pickup
@router.post("/pickups/request", response_model=PickupResponse)
def request_pickup(pickup_request: PickupRequest, db: Session = Depends(get_db)):
    new_pickup = Pickup(**pickup_request.dict(), status="pending")
    db.add(new_pickup)
    db.commit()
    db.refresh(new_pickup)
    return new_pickup

# Get scheduled pickups
@router.get("/pickups/scheduled", response_model=List[PickupResponse])
def get_scheduled_pickups(db: Session = Depends(get_db)):
    return db.query(Pickup).filter(Pickup.status == "confirmed").all()

# Get collection statistics
@router.get("/stats", response_model=StatsResponse)
def get_collection_statistics(db: Session = Depends(get_db)):
    total_pickups = db.query(Pickup).count()
    people_helped = sum(p.impact['peopleHelped'] for p in db.query(Pickup).filter(Pickup.status == "completed"))
    food_saved = sum(p.impact['foodSaved'] for p in db.query(Pickup).filter(Pickup.status == "completed"))
    avg_rating = db.query(Pickup).filter(Pickup.status == "completed").with_entities(func.avg(Pickup.rating)).scalar()
    return {"totalPickups": total_pickups, "peopleHelped": people_helped, "foodSaved": food_saved, "averageRating": avg_rating}

@router.post("/", response_model=CharityResponse)
def create_charity(charity: CharityCreate, db: Session = Depends(get_db)):
    db_charity = Charity(**charity.dict())
    db.add(db_charity)
    db.commit()
    db.refresh(db_charity)
    return db_charity

@router.get("/", response_model=List[CharityResponse])
def list_charities(db: Session = Depends(get_db)):
    return db.query(Charity).all()

@router.get("/{charity_id}", response_model=CharityResponse)
def get_charity(charity_id: int, db: Session = Depends(get_db)):
    charity = db.query(Charity).filter(Charity.id == charity_id).first()
    if not charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    return charity

@router.put("/{charity_id}", response_model=CharityResponse)
def update_charity(
    charity_id: int, 
    charity_update: CharityUpdate, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    charity = db.query(Charity).filter(Charity.id == charity_id).first()
    if not charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    
    for key, value in charity_update.dict(exclude_unset=True).items():
        setattr(charity, key, value)
    
    db.commit()
    db.refresh(charity)
    return charity

@router.get("/{charity_id}/stats")
def get_charity_stats(charity_id: int, db: Session = Depends(get_db)):
    charity = db.query(Charity).filter(Charity.id == charity_id).first()
    if not charity:
        raise HTTPException(status_code=404, detail="Charity not found")
    
    return {
        "total_pickups": charity.total_pickups,
        "people_helped": charity.people_helped,
        "food_saved_kg": charity.food_saved_kg
    }