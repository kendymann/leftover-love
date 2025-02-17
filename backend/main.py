import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from app.routes import auth, restaurants, charities
from app.database.session import engine
from app.models import Base
from app.models.restaurant import Restaurant, FoodItem, Pickup
from app.models.charity import Charity

# Load environment variables
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NoWaste API",
    description="API for connecting restaurants with charities to reduce food waste",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:3000",  # Local development
    "https://journey-hacks2025.vercel.app",  # Production
    "https://journey-hacks2025-git-main-bazinators-projects.vercel.app",  # Preview/Development deployments
    os.getenv("FRONTEND_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(restaurants.router, prefix="/api/restaurants", tags=["restaurants"])
app.include_router(charities.router, prefix="/api/charities", tags=["charities"])

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "127.0.0.1")
    uvicorn.run("main:app", host=host, port=port, reload=True)

