use crate::models::Item;
use rocket::serde::json::Json;

#[get("/items")]
pub fn items() -> Json<Vec<Item>> {
    Json(vec![Item {
        name: "Test item",
        price: 3.50,
    }])
}
