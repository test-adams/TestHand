use chrono::{DateTime, Local};
use sqlx::FromRow;
use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize, FromRow)]
pub struct Item {
    id: i32,
    name: String,
    is_lent_item: bool,
    img_uri: String,
    lend_start: DateTime<Local>,
    lend_end: DateTime<Local>
}