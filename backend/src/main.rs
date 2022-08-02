#[macro_use]
extern crate rocket;

use rocket::http::Method;
use rocket_cors::{AllowedOrigins, CorsOptions};

mod models;
mod routes;

use routes::*;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(
            CorsOptions::default()
                .allowed_origins(AllowedOrigins::all())
                .allowed_methods(
                    vec![Method::Get, Method::Post, Method::Patch]
                        .into_iter()
                        .map(From::from)
                        .collect(),
                )
                .allow_credentials(true)
                .to_cors()
                .unwrap(),
        )
        .mount("/", routes![items, cats])
}
