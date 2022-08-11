from uuid import UUID
from backend.login import get_user_id
from backend.models import Cat, Item, Order
import backend.db as db

from fastapi import APIRouter, HTTPException, Depends, status

router = APIRouter()


@router.get("/items", response_model=list[Item])
def get_items():
    return db.get_items()


@router.post(
    "/buy",
    response_model=list[Order],
    responses={
        404: {"description": "An item was not found"},
    },
)
async def buy(orders: list[Order], user_id: int = Depends(get_user_id)) -> list[Order]:
    if all(db.product_exists(order.product) for order in orders):
        return db.order_items(orders, user_id)
    raise HTTPException(status_code=404, detail="Item not found")


@router.get("/cats", response_model=list[Cat])
async def get_cats():
    return db.get_cats()


@router.post(
    "/adopt/<uuid>",
    response_model=Cat,
    responses={
        404: {"description": "The cat was not found"},
    },
)
async def adopt_cat(uuid: UUID, user_id: int = Depends(get_user_id)) -> Cat:
    if db.cat_exists(uuid):
        return db.adopt_cat(uuid, user_id)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
