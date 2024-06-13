from sqlalchemy.orm import Session
from app.models import Configuration
from app.schemas import ConfigurationCreate, ConfigurationUpdate

def create_configuration(db: Session, configuration: ConfigurationCreate):
    db_configuration = Configuration(**configuration.dict())
    db.add(db_configuration)
    db.commit()
    db.refresh(db_configuration)
    return db_configuration

def get_configuration(db: Session, country_code: str):
    return db.query(Configuration).filter(Configuration.country_code == country_code).first()

def update_configuration(db: Session, country_code: str, configuration: ConfigurationUpdate):
    db_configuration = get_configuration(db, country_code)
    if db_configuration:
        for key, value in configuration.dict().items():
            setattr(db_configuration, key, value)
        db.commit()
        db.refresh(db_configuration)
    return db_configuration

def delete_configuration(db: Session, country_code: str):
    db_configuration = get_configuration(db, country_code)
    if db_configuration:
        db.delete(db_configuration)
        db.commit()
    return db_configuration
