import { Task } from '@/entities/task';
import { ChangeTaskStatus } from '@/features/change-task-status';
import { CreateTask } from '@/features/create-task';
import { DeleteTracker } from '@/features/delete-task-tracker';
import { TaskActions } from '@/features/task-actions';
import { UpdateTask } from '@/features/update-task';
import { UpdateTracker } from '@/features/update-task-tracker';
import React from 'react'

interface ITaskTrackerProps {
	name: string;
	trackerId: string;
}

export const TaskTracker: React.FC<ITaskTrackerProps> = ({ name, trackerId }) => {
    // const { tasksData } = useTasks(trackerId);

    return (
        <div className="max-w-85 min-w-83 rounded-lg border bg-[#0e0e11] px-4 py-3 pb-5">
            <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <UpdateTracker trackerId={trackerId} name={name} />
                    <span className="text-xs text-muted-foreground">32</span>
                </div>
                <DeleteTracker trackerId={trackerId} />
            </div>
            <div className="mb-2 flex flex-col gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((_, index) => (
                    <Task
                        key={index}
                        statusSlot={
                            <ChangeTaskStatus status={"IN_PROGRESS"} taskId={index.toString()} trackerId={trackerId} />
                        }
                        contentSlot={<UpdateTask taskId={index.toString()} trackerId={trackerId} initialText={"New task"} />}
                        menuSlot={<TaskActions trackerId={trackerId} taskId={index.toString()} />}
                    />
                ))}
            </div>
            <CreateTask trackerId={trackerId} />
        </div>
    );
};