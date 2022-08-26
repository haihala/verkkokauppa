from sqlalchemy.orm import Session

from .. import schemas
from . import models


def get_items(db: Session):
    return db.query(models.Product).all()


def product_exists(db: Session, product: int) -> bool:
    return db.query(models.Product).filter(models.Product.id == product).first() is not None


def order_products(orders: list[schemas.Order]) -> list[schemas.Order]:
    return orders


def get_ownerless_cats(db: Session):
    return list(db.query(models.Cat).filter(models.Cat.owner_id == None))


def cat_exists(db: Session, cat_id: int) -> bool:
    return db.query(models.Cat).filter(models.Cat.id == cat_id).first() is not None


def adopt_cat(db: Session, cat_id: int, user: int):
    db.query(models.Cat).filter(
        models.Cat.id == cat_id
    ).update({"owner_id": user})
    db.commit()
