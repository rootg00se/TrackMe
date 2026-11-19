import { Task } from "@/entities/task";
import { Task as TaskType } from "@/entities/task-tracker";
import { ChangeTaskStatus } from "@/features/change-task-status";
import { CreateTask } from "@/features/create-task";
import { DeleteTracker } from "@/features/delete-task-tracker";
import { TaskActions } from "@/features/task-actions";
import { UpdateTask } from "@/features/update-task";
import { UpdateTracker } from "@/features/update-task-tracker";
import React from "react";

interface ITaskTrackerProps {
    name: string;
    trackerId: number;
    tasks: TaskType[];
}

export const TaskTracker: React.FC<ITaskTrackerProps> = ({ tasks, name, trackerId }) => {
    return (
        <div className="max-w-85 min-w-83 rounded-lg border bg-[#0e0e11] px-4 py-3 pb-5">
            <div className="mb-3 flex items-center justify-between gap-3">
                <UpdateTracker trackerId={trackerId} name={name} />
                <DeleteTracker trackerId={trackerId} />
            </div>
            <div className="mb-2 flex flex-col gap-2">
                {tasks?.map((task, index) => (
                    <Task
                        key={index}
                        statusSlot={
                            <ChangeTaskStatus labels={task.labels.map((label) => label.color)} />
                        }
                        contentSlot={<UpdateTask taskId={index} initialText={task.text} />}
                        menuSlot={<TaskActions trackerId={trackerId} taskId={task.taskId} />}
                        startDate={task.startDate}
                        endDate={task.targetDate}
                    />
                ))}
            </div>
            <CreateTask trackerId={trackerId} />
        </div>
    );
};
