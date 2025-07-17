"""Routes for charity profile management."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.security import get_current_user
from app.schemas.charity_schema import (
    CharityCreate, CharityUpdate, CharityResponse
)
from app.models.user import User
from app.models.charity import Charity
from app.models.restaurant import Pickup
from app.database.session import get_db

router = APIRouter()


@router.post("/profile", response_model=CharityResponse)
def create_charity_profile(
    charity_data: CharityCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create charity profile for authenticated charity users.
    
    Args:
        charity_data: Charity profile data
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Created charity profile
        
    Raises:
        HTTPException: If user is not a charity or profile already exists
    """
    if current_user.user_type.value != "charity":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only charity users can create charity profiles"
        )
    
    # Check if profile already exists
    existing_charity = db.query(Charity).filter(Charity.user_id == current_user.id).first()
    if existing_charity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Charity profile already exists"
        )
    
    db_charity = Charity(
        **charity_data.dict(),
        user_id=current_user.id
    )
    db.add(db_charity)
    db.commit()
    db.refresh(db_charity)
    return db_charity


@router.get("/profile", response_model=CharityResponse)
def get_charity_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current user's charity profile.
    
    Args:
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Charity profile data
        
    Raises:
        HTTPException: If charity profile not found
    """
    charity = db.query(Charity).filter(Charity.user_id == current_user.id).first()
    if not charity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Charity profile not found"
        )
    return charity


@router.put("/profile", response_model=CharityResponse)
def update_charity_profile(
    charity_update: CharityUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update charity profile for current user.
    
    Args:
        charity_update: Updated charity data
        current_user: Currently authenticated user
        db: Database session
        
    Returns:
        Updated charity profile
        
    Raises:
        HTTPException: If charity profile not found
    """
    charity = db.query(Charity).filter(Charity.user_id == current_user.id).first()
    if not charity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Charity profile not found"
        )
    
    # Update fields
    update_data = charity_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(charity, field, value)
    
    db.commit()
    db.refresh(charity)
    return charity
