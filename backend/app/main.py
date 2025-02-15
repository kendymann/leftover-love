from fastapi import FastAPI
from app.routes import auth

app = FastAPI(title="Waste Management API", version="1.0")

# Register routers



@app.get("/")
def root():
    return {"message": "API is running!"}
