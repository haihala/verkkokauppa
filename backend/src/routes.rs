use crate::models::{Cat, Item, Order};

use rocket::serde::json::Json;
use uuid::{uuid, Uuid};

#[get("/items")]
pub fn items() -> Json<Vec<Item>> {
    // TODO: Un-hardcode
    Json(vec![Item {
        name: "Test item",
        id: uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8"),
        price: 3.50,
    }])
}

#[get("/cats")]
pub fn cats() -> Json<Vec<Cat>> {
    // TODO: Un-hardcode
    Json(vec![Cat {
        name: "Gus, The Theatre Cat",
        id: uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8"),
        image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Rum Tum Tugger",
        id: uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8"),
        image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Mr Mistoffelees",
        id: uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8"),
        image: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Old Deuteronomy",
        id: uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8"),
        image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Grizabella",
        id: uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8"),
        image: "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Macavity",
        id: uuid!("67e55044-10b1-426f-9247-bb680e5fe0c8"),
        image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }])
}

#[post("/order", data = "<order>")]
pub fn order_items(order: Json<Vec<Order>>) -> Result<String, ()> {
    // Returns a tracking id to the mailing service
    todo!()
}

#[post("/cat/<id>")]
pub fn adopt_cat(id: Uuid) -> Result<String, ()> {
    // Returns a tracking id to the mailing service
    todo!()
}
