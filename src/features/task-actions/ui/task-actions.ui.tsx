import React from "react";

// import { IconDots } from "@tabler/icons-react";
import { DotSquare, Ellipsis, Trash } from "lucide-react";

// import { useTrackers } from "@/entities/task-tracker";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/shared/components/ui";
import { useBoard } from "@/entities/task-tracker";

import { useChangeTracker } from "../model/useChangeTracker";
import { useDeleteTask } from "../model/useDeleteTask";

interface ITaskActionsProps {
    trackerId: number;
    taskId: number;
}

export const TaskActions: React.FC<ITaskActionsProps> = ({ trackerId, taskId }) => {
    const { boardData } = useBoard();
    const { deleteTaskFunc } = useDeleteTask();
    const { changeTrackerFunc } = useChangeTracker();

    const handleDeleteTask = () => {
        deleteTaskFunc({
            id: taskId,
        });

        console.log(trackerId, taskId);
    };

    const handleChangeTracker = (trackerId: number) => {
        changeTrackerFunc({
            taskId,
            trackerId,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer outline-0!">
                <Ellipsis size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4 w-full min-w-40">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <p className="text-sm font-medium">Переместить в</p>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="min-w-40">
                        {boardData
                            ?.filter((tracker) => tracker.taskTrackerId !== trackerId)
                            .map((tracker) => (
                                <DropdownMenuItem
                                    onClick={() => handleChangeTracker(tracker.taskTrackerId)}
                                >
                                    <p className="text-sm font-medium">{tracker.name}</p>
                                </DropdownMenuItem>
                            ))}
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleDeleteTask}>
                    <div className="text-primary flex items-center gap-2">
                        <Trash />
                        <p className="text-sm font-medium">Удалить</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
