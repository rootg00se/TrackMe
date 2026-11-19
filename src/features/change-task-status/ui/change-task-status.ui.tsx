import React from "react";

import type { TaskStatus } from "@/entities/task";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui";
import { parseTaskStatus, parseTextToTaskStatus, taskStatusList } from "@/shared/utils/parse-task-status";

// import { useUpdateStatus } from "../model/useUpdateStatus";

interface IChangeTaskStatusProps {
	status: TaskStatus;
	taskId: string;
	trackerId: string;
}

// Потом снесу ща чисто чтобы стили чекнуть добавил

const tagColors = ["bg-tag-0", "bg-tag-1", "bg-tag-2", "bg-tag-4", "bg-tag-5", "bg-tag-6"];

const getRandomTags = (min = 1, max = 4) => {
	const count = Math.floor(Math.random() * (max - min + 1)) + min;
	return Array.from({ length: count }, () => tagColors[Math.floor(Math.random() * tagColors.length)]);
};

export const ChangeTaskStatus: React.FC<IChangeTaskStatusProps> = ({ status, taskId, trackerId }) => {
	// const { updateStatusFunc } = useUpdateStatus(trackerId);
	const tags = getRandomTags(1, 4);

	console.log(tags);
	

	const handleUpdateStatus = (status: TaskStatus) => {
		// updateStatusFunc({
		// 	taskId,
		// 	status
		// });

		console.log(status, taskId, trackerId);
	};

	return (
		<div className="flex flex-wrap gap-x-2 gap-y-1">
			{tags.map((color, index) => (
				<span key={index} className={`${color} block h-1.5 min-w-10 rounded`} />
			))}
		</div>
		/* 		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer outline-0!">
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-4 w-full">
				{taskStatusList.map(status => (
					<DropdownMenuItem
						className="cursor-pointer"
						onClick={() => handleUpdateStatus(parseTextToTaskStatus(status) || "in_progress")}
					>
						<div className="flex items-center gap-2 rounded-sm">
							<p className="text-sm font-medium">{status}</p>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu> */
	);
};
