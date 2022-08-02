use crate::models::{Cat, Item};
use rocket::serde::json::Json;

#[get("/items")]
pub fn items() -> Json<Vec<Item>> {
    Json(vec![Item {
        name: "Test item",
        price: 3.50,
    }])
}

#[get("/cats")]
pub fn cats() -> Json<Vec<Cat>> {
    Json(vec![Cat {
        name: "Gus, The Theatre Cat",
        image: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Rum Tum Tugger",
        image: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Mr Mistoffelees",
        image: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Old Deuteronomy",
        image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Grizabella",
        image: "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=1600",
    }, Cat {
        name: "Macavity",
        image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }])
}
