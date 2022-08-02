use rocket::serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Item {
    pub name: &'static str,
    pub price: f32,
}
