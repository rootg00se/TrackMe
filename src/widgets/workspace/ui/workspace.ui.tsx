import React from "react";
import { TaskTracker } from "./task-tracker.ui";
import { CreateTaskTracker } from "@/features/create-task-tracker";

export const Workspace: React.FC = () => {
    return (
        <div className="flex flex-1 items-start gap-2 overflow-x-auto px-5 py-5 max-md:px-5">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <TaskTracker key={index} trackerId={index.toString()} name="Tracker" />
            ))}
            <CreateTaskTracker />
        </div>
    );
};
