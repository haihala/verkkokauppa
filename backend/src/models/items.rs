use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Item {
    pub name: &'static str,
    pub id: Uuid,
    pub price: f32,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Order {
    pub product_id: Uuid,
    pub quantity: f32,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Cat {
    pub name: &'static str,
    pub id: Uuid,
    pub image: &'static str,
}
