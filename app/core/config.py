from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    MONGO_URI: str
    DATABASE_NAME: str
    JWT_SECRET: str
    REDIS_URL: str

    class Config:
        env_file = '.env'
        extra = 'ignore'

settings = Settings()