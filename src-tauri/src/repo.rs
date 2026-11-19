use chrono::{NaiveDateTime, Utc};
use sea_orm::DatabaseConnection;

fn now() -> NaiveDateTime {
    Utc::now().naive_utc()
}

fn naive(d: Option<chrono::DateTime<Utc>>) -> Option<NaiveDateTime> {
    d.map(|d| d.naive_utc())
}

