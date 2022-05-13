use actix_web::{web, get, Scope, HttpResponse, Responder};
use serde::{Serialize, Deserialize};
use crate::user::test_users;
use crate::logger;
use crate::SessionData;

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
async fn all_users(data: web::Data<SessionData>) -> impl Responder {
    log_api("GET", "/users");
    let db = data.db.clone();

    match db.get_users().await {
        Some(users) => {
            HttpResponse::Ok().json(users)
        }
        None => {
            HttpResponse::Ok().json(test_users())
        }
    }
}