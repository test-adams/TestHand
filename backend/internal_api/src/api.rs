use actix_web::{web, get, post, delete, Scope, HttpResponse, Responder};
use serde::{Serialize, Deserialize};
use crate::models::user::{test_users, User};
use crate::logger;
use crate::SessionData;

static PREFIX:&str = "/api";

#[derive(Serialize, Deserialize)]
struct ApiStatus {
    api_active: bool,
    db_active: bool
}

#[derive(Serialize, Deserialize)]
struct HttpError {
    status_code: i32,
    message: String
}

// return scope for api prefix with added function routes
pub fn config() -> Scope {
    web::scope(PREFIX)
        .service(status)
        .service(all_users)
        .service(user_by_id)
        .service(create_user)
        .service(delete_user_by_id)
}

// helper to log api routes reached
pub fn log_api(method:&str, route:&str) {
    logger::route(method, PREFIX, route);
}

#[get("/status")] // api base page
async fn status(data: web::Data<SessionData>) -> impl Responder {
    log_api("GET", "/status");
    let db = &data.db;
    let db_status = match db.pool {
        Some(_) => true,
        None => false
    };
    let status = ApiStatus {
        api_active: true,
        db_active: db_status.clone()
    };
    HttpResponse::Ok().json(status)
}

#[get("/user")] // all users
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

#[post("/user")]
async fn create_user(data: web::Data<SessionData>, user_json: web::Json<User>) -> impl Responder {
    log_api("POST", "/users");
    let user: User = user_json.into_inner();
    user.to_db(&data.db).await;
    HttpResponse::Ok().json(user)
} 

#[get("/user/{id}")]
async fn user_by_id(data: web::Data<SessionData>, id: web::Path<String>) -> impl Responder {
    let id_int = id.into_inner();
    log_api("GET", &format!("/users/{}", id_int));
    match User::from_db(&data.db, id_int).await {
        Some(user) => {
            HttpResponse::Ok().json(user)
        }
        None => {
            HttpResponse::BadRequest().json(HttpError {
                status_code: 400,
                message: "user not found".to_string()
            })
        }
    }
}

#[delete("/user/{id}")]
async fn delete_user_by_id(data: web::Data<SessionData>, id: web::Path<String>) -> impl Responder {
    let id_int = id.into_inner();
    log_api("DELETE", &format!("/users/{}", id_int));
    if data.db.delete_kind_by_id("users", &id_int).await {
        HttpResponse::NoContent().finish()
    } else {
        HttpResponse::BadRequest().json(HttpError {
            status_code: 400,
            message: "user not found".to_string()
        })
    }
}