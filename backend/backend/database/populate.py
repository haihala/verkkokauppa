from typing import Iterable

from sqlalchemy.orm import Session

from . import Base, models

_products = [
    {
        "name": "Cat food",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cat_and_Cat_Foods.jpg/1280px-Cat_and_Cat_Foods.jpg",
        "price": 3.50,
    },
]


_cats = [
    {
        "name": "Gus, The Theatre Cat",
        "image": "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        "name": "Rum Tum Tugger",
        "image": "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        "name": "Mr Mistoffelees",
        "image": "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        "name": "Old Deuteronomy",
        "image": "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        "name": "Grizabella",
        "image": "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
        "name": "Macavity",
        "image": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
]

_users = [{"username": "kisukauppa", "password": "passu"}]


def _populate_model(db: Session, model: Base, data: Iterable[dict]):
    for item in data:
        db.add(model(**item))
    db.commit()


def populate(db: Session):
    _populate_model(
        db,
        models.Cat,
        [
            {"id": index} | cat
            for index, cat
            in enumerate(_cats)
        ]
    )

    _populate_model(
        db,
        models.Product,
        [
            {"id": index} | product
            for index, product
            in enumerate(_products)
        ]
    )

    _populate_model(
        db,
        models.User,
        [
            {"id": index} | user
            for index, user
            in enumerate(_users)
        ]
    )
