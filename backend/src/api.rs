use actix_web::{web, get, post, Scope, HttpResponse, Responder};
use crate::user;
use serde::{Serialize, Deserialize};
use crate::logger;

static PREFIX:&str = "/api";

#[derive(Serialize, Deserialize)]
struct ApiStatus {
    active: bool
}

// return scope for api prefix with added function routes
pub fn config() -> Scope {
    web::scope(PREFIX)
        .service(base)
        .service(all_users)
}

// helper to log api routes reached
pub fn log_api(method:&str, route:&str) {
    logger::route(method, PREFIX, route);
}

#[get("/")] // api base page
async fn base() -> impl Responder {
    log_api("GET", "/");
    let status = ApiStatus {
        active: true
    };
    HttpResponse::Ok().json(status)
}

#[get("/users")] // all users
async fn all_users() -> impl Responder {
    log_api("GET", "/users");
    HttpResponse::Ok().json(user::test_users())
}