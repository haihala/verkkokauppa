from uuid import UUID
from pydantic import BaseModel, PositiveInt, PositiveFloat


class Cat(BaseModel):
    id: str
    name: str
    image: str

    class Config:
        orm_mode = True


class Product(BaseModel):
    id: str
    name: str
    image: str
    price: PositiveFloat

    class Config:
        orm_mode = True


class Order(BaseModel):
    product: UUID
    amount: PositiveInt

    class Config:
        orm_mode = True
