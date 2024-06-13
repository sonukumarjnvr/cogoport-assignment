from sqlalchemy import Column, Integer, String
from app.database import Base

class Configuration(Base):
    __tablename__ = "configurations"

    id = Column(Integer, primary_key=True, index=True)
    country_code = Column(String, unique=True, index=True)
    requirements = Column(String)
