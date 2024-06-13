from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import Configuration, ConfigurationCreate, ConfigurationUpdate
from app.crud import create_configuration, get_configuration, update_configuration, delete_configuration
from app.database import get_db

router = APIRouter()

@router.post("/create_configuration", response_model=Configuration)
def create(configuration: ConfigurationCreate, db: Session = Depends(get_db)):
    return create_configuration(db, configuration)

@router.get("/get_configuration/{country_code}", response_model=Configuration)
def read(country_code: str, db: Session = Depends(get_db)):
    db_configuration = get_configuration(db, country_code)
    if db_configuration is None:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return db_configuration

@router.post("/update_configuration", response_model=Configuration)
def update(configuration: ConfigurationUpdate, db: Session = Depends(get_db)):
    return update_configuration(db, configuration.country_code, configuration)

@router.delete("/delete_configuration/{country_code}", response_model=Configuration)
def delete(country_code: str, db: Session = Depends(get_db)):
    return delete_configuration(db, country_code)
