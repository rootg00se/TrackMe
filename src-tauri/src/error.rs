use sea_orm::{DbErr, SqlErr};

#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("not found")]
    NotFound,
    #[error("already exists")]
    Conflict,
    #[error("referenced record does not exist")]
    InvalidReference,
    #[error("internal database error")]
    Db(#[source] DbErr),
}

impl From<DbErr> for AppError {
    fn from(e: DbErr) -> Self {
        match e.sql_err() {
            Some(SqlErr::UniqueConstraintViolation(_)) => AppError::Conflict,
            Some(SqlErr::ForeignKeyConstraintViolation(_)) => AppError::InvalidReference,
            _ => match e {
                DbErr::RecordNotFound(_) => AppError::NotFound,
                other => {
                    eprintln!("database error: {other:?}");
                    AppError::Db(other)
                }
            },
        }
    }
}

impl serde::Serialize for AppError {
    fn serialize<S: serde::Serializer>(&self, s: S) -> Result<S::Ok, S::Error> {
        s.serialize_str(&self.to_string())
    }
}