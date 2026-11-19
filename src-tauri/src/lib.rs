use tauri::Manager;

mod commands;
mod db;
mod entities;
mod error;
mod models;
mod repo;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let db = tauri::async_runtime::block_on(db::init_db(app.handle()))?;
            app.manage(db);

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_board,
            commands::create_tracker,
            commands::rename_tracker,
            commands::delete_tracker,
            commands::create_task,
            commands::update_task,
            commands::move_task,
            commands::delete_task,
            commands::set_task_labels,
            commands::list_labels,
            commands::create_label,
            commands::delete_label,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
