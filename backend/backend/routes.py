from backend.utils import dict_to_model_list
from backend.models import Cat, Item, Order

from fastapi import APIRouter, HTTPException, Request, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from uuid import uuid4
import secrets

router = APIRouter()

items = {
    str(uuid4()): {
        "name": "Cat food",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cat_and_Cat_Foods.jpg/1280px-Cat_and_Cat_Foods.jpg",
        "price": 3.50,
    },
}


cats = {
    str(uuid4()): {
        "name": "Gus, The Theatre Cat",
        "image": "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    str(uuid4()): {
        "name": "Rum Tum Tugger",
        "image": "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    str(uuid4()): {
        "name": "Mr Mistoffelees",
        "image": "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    str(uuid4()): {
        "name": "Old Deuteronomy",
        "image": "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    str(uuid4()): {
        "name": "Grizabella",
        "image": "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    str(uuid4()): {
        "name": "Macavity",
        "image": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
}


@router.get("/items", response_model=list[Item])
def get_items():
    return dict_to_model_list(items)


@router.post("/buy")
async def buy(orders: list[Order]):
    if any(str(order.product) not in items for order in orders):
        raise HTTPException(status_code=404, detail="Item not found")
    return orders


@router.get("/cats", response_model=list[Cat])
async def get_cats():
    return dict_to_model_list(cats)


@router.post("/adopt/<uuid>")
async def get_cats(uuid):
    if uuid not in cats:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    del cats[uuid]


@router.get("/logged-in")
async def get_login(request: Request):
    if not request.session.get("authenticated"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


security = HTTPBasic()


@router.put("/login")
async def put_login(request: Request, credentials: HTTPBasicCredentials = Depends(security)):
    # TODO: Un-hardcode this
    correct_username = secrets.compare_digest(
        credentials.username, "kisukauppa")
    correct_password = secrets.compare_digest(
        credentials.password, "passu")
    if correct_username and correct_password:
        request.session["authenticated"] = True
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
