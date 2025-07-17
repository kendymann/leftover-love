"""Routes for food item listings and pickup management."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.security import get_current_user
from app.schemas.listing import (
    FoodItemCreate, FoodItemUpdate, FoodItemResponse,
    PickupCreate, PickupUpdate, PickupResponse
)
from app.models.user import User
from app.models.restaurant import FoodItem, Pickup, Restaurant
from app.database.session import get_db

router = APIRouter()


@router.get("/", response_model=List[FoodItemResponse])
def get_available_food_items(db: Session = Depends(get_db)):
    """
    Get all available food items for charities to browse.
    
    Args:
        db: Database session
        
    Returns:
        List of all available food items
    """
    food_items = db.query(FoodItem).all()
    return food_items


@router.post("/", response_model=FoodItemResponse)
def create_food_item(
    food_item: FoodItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new food listing for restaurants.
    
    Args:
        food_item: Food item data
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Created food item
        
    Raises:
        HTTPException: If user is not a restaurant or restaurant profile not found
    """
    if current_user.user_type.value != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only restaurants can create food listings"
        )
    
    # Get restaurant profile
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant profile not found"
        )
    
    db_food_item = FoodItem(
        **food_item.dict(),
        restaurant_id=restaurant.id
    )
    db.add(db_food_item)
    db.commit()
    db.refresh(db_food_item)
    return db_food_item

@router.put("/{food_item_id}", response_model=FoodItemResponse)
def update_food_item(
    food_item_id: int,
    food_item_update: FoodItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a food listing (restaurant owner only).
    
    Args:
        food_item_id: ID of the food item to update
        food_item_update: Updated food item data
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Updated food item
        
    Raises:
        HTTPException: If food item not found or user doesn't own it
    """
    food_item = db.query(FoodItem).filter(FoodItem.id == food_item_id).first()
    if not food_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Food item not found"
        )
    
    # Check if user owns this food item
    if food_item.restaurant.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own food listings"
        )
    
    # Update fields
    update_data = food_item_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(food_item, field, value)
    
    db.commit()
    db.refresh(food_item)
    return food_item


@router.delete("/{food_item_id}")
def delete_food_item(
    food_item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a food listing (restaurant owner only).
    
    Args:
        food_item_id: ID of the food item to delete
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: If food item not found or user doesn't own it
    """
    food_item = db.query(FoodItem).filter(FoodItem.id == food_item_id).first()
    if not food_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Food item not found"
        )
    
    # Check if user owns this food item
    if food_item.restaurant.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own food listings"
        )
    
    db.delete(food_item)
    db.commit()
    return {"message": "Food item deleted successfully"}


@router.post("/{food_item_id}/pickup", response_model=PickupResponse)
def schedule_pickup(
    food_item_id: int,
    pickup_data: PickupCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Schedule a pickup for a food item (charities only).
    
    Args:
        food_item_id: ID of the food item to pick up
        pickup_data: Pickup scheduling data
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Created pickup record
        
    Raises:
        HTTPException: If user is not a charity, food item not found, or charity profile not found
    """
    if current_user.user_type.value != "charity":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only charities can schedule pickups"
        )
    
    food_item = db.query(FoodItem).filter(FoodItem.id == food_item_id).first()
    if not food_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Food item not found"
        )
    
    # Get charity profile
    from app.models.charity import Charity
    charity = db.query(Charity).filter(Charity.user_id == current_user.id).first()
    if not charity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Charity profile not found"
        )
    
    db_pickup = Pickup(
        food_item_id=food_item_id,
        restaurant_id=food_item.restaurant_id,
        charity_id=charity.id,
        pickup_time=pickup_data.pickup_time,
        status="scheduled"
    )
    db.add(db_pickup)
    db.commit()
    db.refresh(db_pickup)
    return db_pickup
