"""Routes for restaurant profile management and statistics."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.security import get_current_user
from app.schemas.restaurant_schema import (
    RestaurantCreate, RestaurantUpdate, RestaurantResponse, RestaurantStatsResponse
)
from app.models.user import User
from app.models.restaurant import Restaurant, FoodItem, Pickup
from app.database.session import get_db

router = APIRouter()


@router.post("/profile", response_model=RestaurantResponse)
def create_restaurant_profile(
    restaurant_data: RestaurantCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create restaurant profile for authenticated restaurant users.
    
    Args:
        restaurant_data: Restaurant profile data
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Created restaurant profile
        
    Raises:
        HTTPException: If user is not a restaurant or profile already exists
    """
    if current_user.user_type.value != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only restaurant users can create restaurant profiles"
        )
    
    # Check if profile already exists
    existing_restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if existing_restaurant:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Restaurant profile already exists"
        )
    
    db_restaurant = Restaurant(
        **restaurant_data.dict(),
        user_id=current_user.id
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant


@router.get("/profile", response_model=RestaurantResponse)
def get_restaurant_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current user's restaurant profile.
    
    Args:
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Restaurant profile data
        
    Raises:
        HTTPException: If restaurant profile not found
    """
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant profile not found"
        )
    return restaurant


@router.put("/profile", response_model=RestaurantResponse)
def update_restaurant_profile(
    restaurant_update: RestaurantUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update restaurant profile for current user.
    
    Args:
        restaurant_update: Updated restaurant data
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Updated restaurant profile
        
    Raises:
        HTTPException: If restaurant profile not found
    """
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant profile not found"
        )
    
    # Update fields
    update_data = restaurant_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(restaurant, field, value)
    
    db.commit()
    db.refresh(restaurant)
    return restaurant


@router.get("/stats", response_model=RestaurantStatsResponse)
def get_restaurant_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get restaurant statistics and impact metrics.
    
    Args:
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Restaurant statistics including total listings, pickups, and impact metrics
        
    Raises:
        HTTPException: If restaurant profile not found
    """
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant profile not found"
        )
    
    # Calculate stats
    total_listings = db.query(FoodItem).filter(FoodItem.restaurant_id == restaurant.id).count()
    total_pickups = db.query(Pickup).filter(Pickup.restaurant_id == restaurant.id).count()
    
    # Calculate impact (simplified for MVP)
    food_saved_kg = total_pickups * 2.5  # Estimate 2.5kg per pickup
    people_helped = total_pickups * 4    # Estimate 4 people helped per pickup
    
    return {
        "total_listings": total_listings,
        "total_pickups": total_pickups,
        "food_saved_kg": food_saved_kg,
        "people_helped": people_helped
    }
