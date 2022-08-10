from backend.models import Cat, Item

from fastapi import APIRouter

router = APIRouter()


@router.get("/items", response_model=list[Item])
def items():
    return [{
        "name": "Cat food",
        "id": "67e55044-10b1-426f-9247-bb680e5fe0c8",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cat_and_Cat_Foods.jpg/1280px-Cat_and_Cat_Foods.jpg",
        "price": 3.50,
    }]


@router.get("/cats", response_model=list[Cat])
async def cats():
    return [
        {
            "name": "Gus, The Theatre Cat",
            "id": "67e55044-10b1-426f-9247-bb680e5fe0c8",
            "image": "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            "name": "Rum Tum Tugger",
            "id": "67e55044-10b1-426f-9247-bb680e5fe0c8",
            "image": "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            "name": "Mr Mistoffelees",
            "id": "67e55044-10b1-426f-9247-bb680e5fe0c8",
            "image": "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            "name": "Old Deuteronomy",
            "id": "67e55044-10b1-426f-9247-bb680e5fe0c8",
            "image": "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            "name": "Grizabella",
            "id": "67e55044-10b1-426f-9247-bb680e5fe0c8",
            "image": "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            "name": "Macavity",
            "id": "67e55044-10b1-426f-9247-bb680e5fe0c8",
            "image": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }
    ]
