from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User
from backend.app.schemas import UserCreate, UserLogin, UserUpdate, PasswordUpdate, UserResponse
from backend.app.auth import get_current_user, hash_password, verify_password, create_access_token
from typing import Any

router = APIRouter()

# Register a new user
@router.post("/auth/signup", response_model=UserResponse)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(**user_data.dict(), password=hash_password(user_data.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Login user
@router.post("/auth/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(user.id)
    return {"access_token": token, "token_type": "bearer"}

# Logout user (handled client-side by clearing token)
@router.post("/auth/logout")
def logout():
    return {"message": "Logged out successfully"}

# Get current user details
@router.get("/auth/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user

# Update user profile
@router.put("/auth/update", response_model=UserResponse)
def update_user(user_update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(current_user, key, value)
    db.commit()
    db.refresh(current_user)
    return current_user

# Update password
@router.put("/auth/password")
def update_password(password_update: PasswordUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not verify_password(password_update.old_password, current_user.password):
        raise HTTPException(status_code=400, detail="Incorrect old password")
    current_user.password = hash_password(password_update.new_password)
    db.commit()
    return {"message": "Password updated successfully"}

# Delete account
@router.delete("/auth/delete")
def delete_account(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db.delete(current_user)
    db.commit()
    return {"message": "Account deleted successfully"}
