from sqlalchemy.orm import Session

from . import models, schemas

from uuid import uuid4

_items = {
    uuid4(): {
        "name": "Cat food",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cat_and_Cat_Foods.jpg/1280px-Cat_and_Cat_Foods.jpg",
        "price": 3.50,
    },
}


_cats = {
    uuid4(): {
        "name": "Gus, The Theatre Cat",
        "image": "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    uuid4(): {
        "name": "Rum Tum Tugger",
        "image": "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    uuid4(): {
        "name": "Mr Mistoffelees",
        "image": "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    uuid4(): {
        "name": "Old Deuteronomy",
        "image": "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    uuid4(): {
        "name": "Grizabella",
        "image": "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    uuid4(): {
        "name": "Macavity",
        "image": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
}


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
