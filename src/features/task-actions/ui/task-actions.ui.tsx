import React from "react";

// import { IconDots } from "@tabler/icons-react";
import { DotSquare, Trash } from "lucide-react";

// import { useTrackers } from "@/entities/task-tracker";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "@/shared/components/ui";

// import { useChangeTracker } from "../model/useChangeTracker";
// import { useDeleteTask } from "../model/useDeleteTask";

interface ITaskActionsProps {
	trackerId: string;
	taskId: string;
}

export const TaskActions: React.FC<ITaskActionsProps> = ({ trackerId, taskId }) => {
	// const { trackersData } = useTrackers(projectId);
	// const { deleteFunc } = useDeleteTask(trackerId);
	// const { changeTrackerFunc } = useChangeTracker();

	const handleDeleteTask = () => {
		// deleteFunc({
		// 	taskId
		// });

		console.log(trackerId, taskId);
		
	};

	const handleChangeTracker = (trackerId: string) => {
		// changeTrackerFunc({
		// 	taskId,
		// 	taskTrackerId: trackerId
		// });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer outline-0!">
				<DotSquare size={16} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-4 w-full min-w-40">
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<p className="text-sm font-medium">Переместить в</p>
					</DropdownMenuSubTrigger>
					<DropdownMenuSubContent className="min-w-40">
						{[1, 2, 3, 4]
							// ?.filter(tracker => tracker.task_tracker_id !== trackerId)
							.map(tracker => (
								<DropdownMenuItem>
									<p className="text-sm font-medium">{"N"}</p>
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
