use sea_orm::{Database, DatabaseConnection};
use tauri::Manager;

pub async fn init_db(app: &tauri::AppHandle) -> Result<DatabaseConnection, Box<dyn std::error::Error>> {
    let app_dir = app.path().app_data_dir().expect("Failed to get app dir");

    std::fs::create_dir(&app_dir)?;

    let db_path = app_dir.join("track-me.db");
    let database_url = format!("sqlite://{}?mode=rwc", db_path.to_str().unwrap());

    let db = Database::connect(&database_url).await?;

    Ok(db)
}
