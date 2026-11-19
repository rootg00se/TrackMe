CREATE TABLE task_trackers (
    task_tracker_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL CHECK (length(name) <= 64),
    created_at      datetime_text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    task_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    status          TEXT NOT NULL DEFAULT 'IN_PROGRESS'
        CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'POSTPONED')),
    task_tracker_id INTEGER NOT NULL,
    text            TEXT NOT NULL,
    created_at      datetime_text NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      datetime_text NOT NULL DEFAULT CURRENT_TIMESTAMP,
    start_date      datetime_text,
    target_date     datetime_text,

    CONSTRAINT fk_tasks_task_trackers_task_tracker_id
        FOREIGN KEY (task_tracker_id) REFERENCES task_trackers (task_tracker_id)
        ON DELETE CASCADE
);

CREATE TABLE labels (
    label_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    color      TEXT NOT NULL CHECK (length(color) <= 9),
    text       TEXT NOT NULL CHECK (length(text) <= 64),
    created_at datetime_text NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime_text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task_labels (
    task_id  INTEGER NOT NULL,
    label_id INTEGER NOT NULL,

    CONSTRAINT pk_task_labels_task_id_label_id PRIMARY KEY (task_id, label_id),
    CONSTRAINT fk_task_labels_tasks_task_id
        FOREIGN KEY (task_id) REFERENCES tasks (task_id) ON DELETE CASCADE,
    CONSTRAINT fk_task_labels_labels_label_id
        FOREIGN KEY (label_id) REFERENCES labels (label_id) ON DELETE CASCADE
) WITHOUT ROWID;

CREATE INDEX idx_tasks_task_tracker_id    ON tasks (task_tracker_id);
CREATE INDEX idx_task_labels_label_id     ON task_labels (label_id);

CREATE TRIGGER trg_labels_updated_at
AFTER UPDATE ON labels
FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
    UPDATE labels SET updated_at = CURRENT_TIMESTAMP WHERE label_id = NEW.label_id;
END;