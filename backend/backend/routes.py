from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends, status

from .database import get_db, operations
from .schemas import Cat, Product, Order
from .login import get_user_id


router = APIRouter()


@router.get("/items", response_model=list[Product])
def get_items(db: Session = Depends(get_db)):
    return operations.get_items(db)


@router.post(
    "/buy",
    response_model=list[Order],
    responses={
        404: {"description": "An item was not found"},
    },
)
async def buy(orders: list[Order], user_id: int = Depends(get_user_id), db: Session = Depends(get_db)) -> list[Order]:
    if all(operations.product_exists(db, order.product) for order in orders):
        return operations.order_items(db, orders, user_id)
    raise HTTPException(status_code=404, detail="Item not found")


@router.get("/cats", response_model=list[Cat])
async def get_cats(db: Session = Depends(get_db)):
    return operations.get_ownerless_cats(db)


@router.post(
    "/adopt",
    response_model=Cat,
    responses={
        404: {"description": "The cat was not found"},
    },
)
async def adopt_cat(cat_id: str, user_id: int = Depends(get_user_id), db: Session = Depends(get_db)) -> Cat:
    if operations.cat_exists(db, cat_id):
        return operations.adopt_cat(db, cat_id, user_id)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
