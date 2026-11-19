use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::entities::{labels, task_trackers, tasks};

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TaskTracker {
    pub task_tracker_id: i64,
    pub name: String,
    pub created_at: DateTime<Utc>
}

impl From<task_trackers::Model> for TaskTracker {
    fn from(value: task_trackers::Model) -> Self {
        Self { 
            task_tracker_id: value.task_tracker_id, 
            name: value.name, 
            created_at: value.created_at.and_utc() 
        }
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Label {
    pub label_id: i64,
    pub color: String,
    pub text: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<labels::Model> for Label {
    fn from(m: labels::Model) -> Self {
        Self {
            label_id: m.label_id,
            color: m.color,
            text: m.text,
            created_at: m.created_at.and_utc(),
            updated_at: m.updated_at.and_utc(),
        }
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LabelRef {
    pub label_id: i64,
    pub color: String,
    pub text: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Task {
    pub task_id: i64,
    pub status: String,
    pub task_tracker_id: i64,
    pub text: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub start_date: Option<DateTime<Utc>>,
    pub target_date: Option<DateTime<Utc>>,
    pub labels: Vec<LabelRef>,
}

impl From<&tasks::ModelEx> for Task {
    fn from(t: &tasks::ModelEx) -> Self {
        Self {
            task_id: t.task_id,
            status: t.status.clone(),
            task_tracker_id: t.task_tracker_id,
            text: t.text.clone(),
            created_at: t.created_at.and_utc(),
            updated_at: t.updated_at.and_utc(),
            start_date: t.start_date.map(|d| d.and_utc()),
            target_date: t.target_date.map(|d| d.and_utc()),
            labels: t
                .labels
                .iter()
                .map(|l| LabelRef {
                    label_id: l.label_id,
                    color: l.color.clone(),
                    text: l.text.clone(),
                })
                .collect(),
        }
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TrackerColumn {
    #[serde(flatten)]
    pub tracker: TaskTracker,
    pub tasks: Vec<Task>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateTracker {
    pub name: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateTask {
    pub task_tracker_id: i64,
    pub text: String,
    pub start_date: Option<DateTime<Utc>>,
    pub target_date: Option<DateTime<Utc>>,
    #[serde(default)]
    pub label_ids: Vec<i64>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateTask {
    pub text: Option<String>,
    pub status: Option<String>,
    pub start_date: Option<DateTime<Utc>>,
    pub target_date: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateLabel {
    pub color: String,
    pub text: String,
}