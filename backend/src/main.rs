#[macro_use]
extern crate log;
mod user;
mod logger;
mod api;

use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use std::io;

// static globals for where to run server
static HOST:&str = "localhost";
static PORT:u16 = 9000;

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
    info!("Running backend at {}:{}", HOST, PORT); // log server start

    // start server at HOST:PORT
    HttpServer::new(|| {
        App::new()
            .service(test)
            .service(api::config())
    })
    .bind((HOST, PORT))?
    .run()
    .await
}