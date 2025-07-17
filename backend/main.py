"""
Leftover Love API - Main Application Entry Point

A FastAPI-based platform connecting restaurants with surplus food 
to charities and local food banks, reducing food waste while helping 
those in need.

Author: Leftover Love Team
Version: 1.0.0
"""

import uvicorn
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, restaurants, charities, listings
from app.database.session import engine
from app.models.base import Base
from app.models.restaurant import Restaurant, FoodItem, Pickup
from app.models.charity import Charity
from app.models.user import User

# Load environment variables
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application
app = FastAPI(
    title="Leftover Love API",
    description="Connecting restaurants with charities to reduce food waste and help communities",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for frontend connectivity
origins = [
    "http://localhost:3000",  # Local development
    "https://journey-hacks2025.vercel.app",  # Production
    os.getenv("FRONTEND_URL", "http://localhost:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(restaurants.router, prefix="/api/restaurants", tags=["Restaurants"])
app.include_router(charities.router, prefix="/api/charities", tags=["Charities"])
app.include_router(listings.router, prefix="/api/listings", tags=["Food Listings"])

@app.get("/", tags=["Health Check"])
def health_check():
    """API health check endpoint"""
    return {
        "message": "Leftover Love API is running! 🍽️❤️",
        "status": "healthy",
        "version": "1.0.0"
    }

@app.get("/api/health", tags=["Health Check"])
def api_health():
    """Detailed API health check"""
    return {
        "api": "Leftover Love",
        "status": "operational",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"🚀 Starting Leftover Love API on {host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)

