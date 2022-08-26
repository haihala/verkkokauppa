from secrets import compare_digest

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session

from .. import schemas
from . import get_db, models


security = HTTPBasic()


def get_user_id(db: Session = Depends(get_db), credentials: HTTPBasicCredentials = Depends(security)) -> str:
    if user := db.query(models.User).filter(
        models.User.username ==
        credentials.username,
        models.User.password == credentials.password,
    ).first():
        return user.id

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
        headers={"WWW-Authenticate": "Basic"},
    )


def get_products(db: Session):
    return db.query(models.Product).all()


def product_exists(db: Session, product: int) -> bool:
    return db.query(models.Product).filter(models.Product.id == product).first() is not None


def order_products(db: Session, orders: list[schemas.Order], user_id: str):
    db_orders = []
    for order in orders:
        db_orders.append(models.Order(
            product_id=order.product,
            amount=order.amount,
            user_id=user_id,
        ))
    db.add_all(db_orders)
    db.commit()


def get_ownerless_cats(db: Session):
    return list(db.query(models.Cat).filter(models.Cat.owner_id == None))


def cat_exists(db: Session, cat_id: int) -> bool:
    return db.query(models.Cat).filter(models.Cat.id == cat_id).first() is not None


def adopt_cat(db: Session, cat_id: int, user: str):
    db.query(models.Cat).filter(
        models.Cat.id == cat_id
    ).update({"owner_id": user})
    db.commit()
