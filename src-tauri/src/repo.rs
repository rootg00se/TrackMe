use chrono::{NaiveDateTime, Utc};
use sea_orm::DatabaseConnection;
use std::collections::BTreeSet;
use sea_orm::*;

use crate::{
    entities::{labels, task_labels, task_trackers, tasks},
    error::AppError,
    models::*,
};

fn now() -> NaiveDateTime {
    Utc::now().naive_utc()
}

fn naive(d: Option<chrono::DateTime<Utc>>) -> Option<NaiveDateTime> {
    d.map(|d| d.naive_utc())
}

pub async fn get_board(db: &DatabaseConnection) -> Result<Vec<TrackerColumn>, AppError> {
    let mut trackers = task_trackers::Entity::load()
        .with((tasks::Entity, labels::Entity))
        .all(db)
        .await?;

    trackers.sort_by_key(|t| t.task_tracker_id);

    Ok(trackers
        .iter()
        .map(|t| TrackerColumn {
            tracker: TaskTracker {
                task_tracker_id: t.task_tracker_id,
                name: t.name.clone(),
                created_at: t.created_at.and_utc(),
            },
            tasks: t.tasks.iter().map(Task::from).collect(),
        })
        .collect())
}

pub async fn create_tracker(db: &DatabaseConnection, input: CreateTracker) -> Result<TaskTracker, AppError> {
    let model = task_trackers::ActiveModel {
        name: Set(input.name),
        ..Default::default()
    }
    .insert(db)
    .await?;

    Ok(model.into())
}

pub async fn rename_tracker(db: &DatabaseConnection, id: i64, name: &str) -> Result<TaskTracker, AppError> {
    let tracker = task_trackers::Entity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(AppError::NotFound)?;

    let mut am = tracker.into_active_model();
    am.name = Set(name.to_owned());

    Ok(am.update(db).await?.into())
}

pub async fn delete_tracker(db: &DatabaseConnection, id: i64) -> Result<(), AppError> {
    let res = task_trackers::Entity::delete_by_id(id).exec(db).await?;

    if res.rows_affected == 0 {
        return Err(AppError::NotFound);
    }

    Ok(())
}

pub async fn get_task(db: &DatabaseConnection, id: i64) -> Result<Task, AppError> {
    let task = tasks::Entity::load()
        .filter(tasks::COLUMN.task_id.eq(id))
        .with(labels::Entity)
        .one(db)
        .await?
        .ok_or(AppError::NotFound)?;

    Ok(Task::from(&task))
}

async fn link_labels(txn: &DatabaseTransaction, task_id: i64, label_ids: Vec<i64>) -> Result<(), DbErr> {
    let unique: BTreeSet<i64> = label_ids.into_iter().collect();

    for label_id in unique {
        task_labels::ActiveModel {
            task_id: Set(task_id),
            label_id: Set(label_id),
        }
        .insert(txn)
        .await?;
    }

    Ok(())
}

pub async fn create_task(db: &DatabaseConnection, input: CreateTask) -> Result<Task, AppError> {
    let txn = db.begin().await?;

    let task = tasks::ActiveModel {
        task_tracker_id: Set(input.task_tracker_id),
        text: Set(input.text),
        start_date: Set(naive(input.start_date)),
        target_date: Set(naive(input.target_date)),
        ..Default::default()
    }
    .insert(&txn)
    .await?;

    link_labels(&txn, task.task_id, input.label_ids).await?;
    txn.commit().await?;

    get_task(db, task.task_id).await
}

pub async fn update_task(db: &DatabaseConnection, id: i64, input: UpdateTask) -> Result<Task, AppError> {
    let task = tasks::Entity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(AppError::NotFound)?;

    let mut am = task.into_active_model();

    if let Some(text) = input.text {
        am.text = Set(text);
    }
    if let Some(status) = input.status {
        am.status = Set(status);
    }
    if let Some(d) = input.start_date {
        am.start_date = Set(Some(d.naive_utc()));
    }
    if let Some(d) = input.target_date {
        am.target_date = Set(Some(d.naive_utc()));
    }

    am.updated_at = Set(now());
    am.update(db).await?;

    get_task(db, id).await
}

pub async fn move_task(db: &DatabaseConnection, id: i64, tracker_id: i64) -> Result<Task, AppError> {
    let task = tasks::Entity::find_by_id(id)
        .one(db)
        .await?
        .ok_or(AppError::NotFound)?;

    let mut am = task.into_active_model();

    am.task_tracker_id = Set(tracker_id);
    am.updated_at = Set(now());
    am.update(db).await?;

    get_task(db, id).await
}

pub async fn delete_task(db: &DatabaseConnection, id: i64) -> Result<(), AppError> {
    let res = tasks::Entity::delete_by_id(id).exec(db).await?;

    if res.rows_affected == 0 {
        return Err(AppError::NotFound);
    }

    Ok(())
}

pub async fn set_task_labels(db: &DatabaseConnection, task_id: i64, label_ids: Vec<i64>) -> Result<Task, AppError> {
    let txn = db.begin().await?;

    task_labels::Entity::delete_many()
        .filter(task_labels::COLUMN.task_id.eq(task_id))
        .exec(&txn)
        .await?;

    link_labels(&txn, task_id, label_ids).await?;

    txn.commit().await?;
    get_task(db, task_id).await
}


pub async fn list_labels(db: &DatabaseConnection) -> Result<Vec<Label>, AppError> {
    let rows = labels::Entity::find()
        .order_by_asc(labels::Column::LabelId)
        .all(db)
        .await?;

    Ok(rows.into_iter().map(Label::from).collect())
}

pub async fn create_label(db: &DatabaseConnection, input: CreateLabel) -> Result<Label, AppError> {
    let model = labels::ActiveModel {
        color: Set(input.color),
        text: Set(input.text),
        ..Default::default()
    }
    .insert(db)
    .await?;

    Ok(model.into())
}

pub async fn delete_label(db: &DatabaseConnection, id: i64) -> Result<(), AppError> {
    let res = labels::Entity::delete_by_id(id).exec(db).await?;

    if res.rows_affected == 0 {
        return Err(AppError::NotFound);
    }

    Ok(())
}