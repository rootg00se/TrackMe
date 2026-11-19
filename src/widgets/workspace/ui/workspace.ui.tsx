import React from "react";
import { TaskTracker } from "./task-tracker.ui";
import { CreateTaskTracker } from "@/features/create-task-tracker";
import { useBoard } from "@/entities/task-tracker";

export const Workspace: React.FC = () => {
    const { boardData } = useBoard();

    return (
        <div className="flex flex-1 items-start gap-5 overflow-x-auto px-5 py-5 pb-20 max-md:px-5 h-screen">
            {boardData?.map((tracker) => (
                <TaskTracker
                    key={tracker.taskTrackerId}
                    trackerId={tracker.taskTrackerId}
                    tasks={tracker.tasks}
                    name={tracker.name}
                />
            ))}
            <CreateTaskTracker />
        </div>
    );
};
