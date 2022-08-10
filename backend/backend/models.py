from uuid import UUID
from pydantic import BaseModel


class Cat(BaseModel):
    name: str
    image: str
    id: UUID


class Item(BaseModel):
    name: str
    image: str
    price: float
    id: UUID
