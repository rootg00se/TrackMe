export type TaskStatus = "IN_PROGRESS" | "COMPLETED" | "POSTPONED";

export type LabelRef = { labelId: number; color: string; text: string };

export type Label = LabelRef & {
    createdAt: string;
    updatedAt: string;
};

export type Task = {
    taskId: number;
    status: TaskStatus;
    taskTrackerId: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    startDate: string | null;
    targetDate: string | null;
    labels: LabelRef[];
};

export type TrackerColumn = {
    taskTrackerId: number;
    name: string;
    createdAt: string;
    tasks: Task[];
};

export type TaskTracker = {
    taskTrackerId: number;
    name: string;
    createdAt: string;
};

export type UpdateTaskDto = {
    text?: string;
    status?: string;
}