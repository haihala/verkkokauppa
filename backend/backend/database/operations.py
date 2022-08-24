from sqlalchemy.orm import Session

from .. import schemas
from . import models


def get_items(db: Session):
    return db.query(models.Product).all()


def product_exists(db: Session, product: int) -> bool:
    return db.query(models.Product).filter(models.Product.id == product).exists()


def order_products(orders: list[schemas.Order]) -> list[schemas.Order]:
    return orders


def get_cats(db: Session):
    return db.query(models.Cat).all()


def cat_exists(db: Session, cat: int) -> bool:
    return db.query(models.Cat).filter(models.Cat.id == cat).exists()


def adopt_cat(db: Session, cat_id: int, user: int):
    db.query(models.Cat).filter(models.Cat.id == cat_id).delete()
