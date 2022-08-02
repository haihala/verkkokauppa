#[macro_use]
extern crate rocket;

mod models;
mod routes;
use routes::*;

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![items])
}
