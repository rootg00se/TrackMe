use sea_orm::DatabaseConnection;
use tauri::State;

use crate::{error::AppError, models::*, repo};

type Db<'a> = State<'a, DatabaseConnection>;

#[tauri::command]
pub async fn get_board(db: Db<'_>) -> Result<Vec<TrackerColumn>, AppError> {
    repo::get_board(&db).await
}

#[tauri::command]
pub async fn create_tracker(db: Db<'_>, input: CreateTracker) -> Result<TaskTracker, AppError> {
    repo::create_tracker(&db, input).await
}

#[tauri::command]
pub async fn rename_tracker(db: Db<'_>, id: i64, name: String) -> Result<TaskTracker, AppError> {
    repo::rename_tracker(&db, id, &name).await
}

#[tauri::command]
pub async fn delete_tracker(db: Db<'_>, id: i64) -> Result<(), AppError> {
    repo::delete_tracker(&db, id).await
}

#[tauri::command]
pub async fn create_task(db: Db<'_>, input: CreateTask) -> Result<Task, AppError> {
    repo::create_task(&db, input).await
}

#[tauri::command]
pub async fn update_task(db: Db<'_>, id: i64, input: UpdateTask) -> Result<Task, AppError> {
    repo::update_task(&db, id, input).await
}

#[tauri::command]
pub async fn move_task(db: Db<'_>, id: i64, tracker_id: i64) -> Result<Task, AppError> {
    repo::move_task(&db, id, tracker_id).await
}

#[tauri::command]
pub async fn delete_task(db: Db<'_>, id: i64) -> Result<(), AppError> {
    repo::delete_task(&db, id).await
}

#[tauri::command]
pub async fn set_task_labels(db: Db<'_>, task_id: i64, label_ids: Vec<i64>) -> Result<Task, AppError> {
    repo::set_task_labels(&db, task_id, label_ids).await
}

#[tauri::command]
pub async fn list_labels(db: Db<'_>) -> Result<Vec<Label>, AppError> {
    repo::list_labels(&db).await
}

#[tauri::command]
pub async fn create_label(db: Db<'_>, input: CreateLabel) -> Result<Label, AppError> {
    repo::create_label(&db, input).await
}

#[tauri::command]
pub async fn delete_label(db: Db<'_>, id: i64) -> Result<(), AppError> {
    repo::delete_label(&db, id).await
}