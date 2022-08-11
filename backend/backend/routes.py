from uuid import UUID
from backend.login import get_user_id
from backend.models import Cat, Item, Order
import backend.db as db

from fastapi import APIRouter, HTTPException, Depends, status

router = APIRouter()


@router.get("/items", response_model=list[Item])
def get_items():
    return db.get_items()


@router.post("/buy")
async def buy(orders: list[Order], user_id: int = Depends(get_user_id)):
    if all(db.product_exists(order.product) for order in orders):
        db.order_items(orders, user_id)
    else:
        raise HTTPException(status_code=404, detail="Item not found")


@router.get("/cats", response_model=list[Cat])
async def get_cats():
    return db.get_cats()


@router.post("/adopt/<uuid>")
async def adopt_cat(uuid: UUID, user_id: int = Depends(get_user_id)):
    if db.cat_exists(uuid):
        db.adopt_cat(uuid, user_id)
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
