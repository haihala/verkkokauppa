from uuid import UUID
from pydantic import BaseModel, PositiveInt, PositiveFloat


class Cat(BaseModel):
    name: str
    image: str
    id: UUID


class Item(BaseModel):
    name: str
    image: str
    price: PositiveFloat
    id: UUID


class Order(BaseModel):
    product: UUID
    amount: PositiveInt
