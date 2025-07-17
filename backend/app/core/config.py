"""Application configuration settings."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Database configuration
    DATABASE_URL: str
    
    # Security settings
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Frontend URL for CORS
    FRONTEND_URL: str

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignore extra fields from .env


# Global settings instance
settings = Settings()
