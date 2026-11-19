import { invoke } from "@tauri-apps/api/core";
import { TaskTracker, TrackerColumn } from "../model/types";

export const taskTrackersApi = {
    baseKey: "trackers",
    getBoard: () => invoke<TrackerColumn>("get_board"),
    createTracker: (input: { name: string }) => invoke<TaskTracker>("create_tracker", { input }),
    renameTracker: (id: number, name: string) => invoke<TaskTracker>("rename_tracker", { id, name }),
    deleteTracker: (id: number) => invoke<void>("delete_tracker", { id })
};
