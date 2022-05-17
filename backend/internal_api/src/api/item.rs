use actix_web::{web, get, post, delete, Scope, HttpResponse, Responder};
use crate::SessionData;
use crate::api::{log_api, HttpError};
use crate::models::item::test_items;

static ITEM_PREFIX:&str = "/item";

pub fn config() -> Scope {
    web::scope(ITEM_PREFIX)
    .service(all_items)
}

pub fn log_item(method:&str, route:&str) {
    log_api(method, &format!("{}{}", ITEM_PREFIX, route))
}

#[get("")]
async fn all_items(data: web::Data<SessionData>) -> impl Responder {
    log_item("GET", "");
    let db = &data.db;
    match db.get_items().await {
        Some(items) => {
            HttpResponse::Ok().json(items)
        }
        None => {
            HttpResponse::Ok().json(test_items())
        }
    }
}