import { invoke } from "@tauri-apps/api/core";
import { CreateTaskDto, Task } from "../model/types";
import { UpdateTaskDto } from "@/entities/task-tracker/model/types";

export const tasksApi = {
    baseKey: "tasks",
    createTask: (input: CreateTaskDto) => invoke<Task>("create_task", { input }),
    updateTask: (id: number, input: UpdateTaskDto) => invoke<Task>("update_task", { id, input }),
    moveTask: (id: number, trackerId: number) => invoke<Task>("move_task", { id, trackerId }),
    deleteTask: (id: number) => invoke<void>("delete_task", { id }),
    setTaskLables: (id: number, labelIds: number[]) => {
        invoke<Task>("set_task_labels", { id, labelIds });
    },
};
