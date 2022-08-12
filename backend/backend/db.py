from backend.models import Cat, Item, Order

from typing import Any
from uuid import UUID, uuid4

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


def get_items() -> list[Item]:
    return _dict_to_model_list(_items)


def product_exists(uuid: UUID) -> bool:
    return any(uuid == product_id for product_id in _items)


def order_items(orders: list[Order], user: int) -> list[Order]:
    return orders


def get_cats() -> list[Cat]:
    return _dict_to_model_list(_cats)


def cat_exists(uuid: UUID) -> bool:
    return any(uuid == cat_id for cat_id in _cats)


def adopt_cat(uuid: UUID, user: int):
    cat = _cats[uuid]
    del _cats[uuid]
    return {"id": uuid} | cat


def _dict_to_model_list(dict_input: dict[str, dict[str, Any]]) -> list[dict]:
    return [value | {"id": str(key)} for key, value in dict_input.items()]
