#[macro_use]
extern crate log;
mod user;
mod logger;
mod api;
mod config;

use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use std::io;


#[get("/")] // test landing page
async fn test() -> impl Responder {
    info!("GET /");
    HttpResponse::Ok().body("Backend running.")
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    match logger::init() { // initialize logger for info/debugging
        Err(err) => {
            println!("Unable to start logger due to {}", err);
        }
        _ => {
            info!("Logger initialized");
        }
    }
    let config:config::Config = config::Config::new();
    info!("Running backend at {}:{}", config.host, config.port); // log server start

    // start server at HOST:PORT
    HttpServer::new(|| {
        App::new()
            .service(test)
            .service(api::config())
    })
    .bind((config.host, config.port))?
    .run()
    .await
}