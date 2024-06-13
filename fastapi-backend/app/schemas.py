from pydantic import BaseModel

class ConfigurationBase(BaseModel):
    country_code: str
    requirements: dict

class ConfigurationCreate(ConfigurationBase):
    pass

class ConfigurationUpdate(ConfigurationBase):
    pass

class Configuration(ConfigurationBase):
    id: int

    class Config:
        orm_mode = True
