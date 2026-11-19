import React, { useState } from "react";
import { Input } from "@/shared/components/ui";
import { useUpdateTask } from "../model/useUpdateTask";

interface IUpdateTaskProps {
	initialText: string;
	taskId: number;
}

export const UpdateTask: React.FC<IUpdateTaskProps> = ({ initialText, taskId }) => {
	const [text, setText] = useState(initialText);
	const [editMode, setEditMode] = useState(false);

	const { updateTaskFunc } = useUpdateTask();

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			updateTaskFunc({
				id: taskId,
				data: { text }
			});

			setEditMode(false);
		}

		if (event.key === "Escape") setEditMode(false);
	};

	return (
		<div>
			{editMode ? (
				<Input
					autoFocus
					defaultValue={initialText}
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder="Распишите задачу и нажмите enter"
					onKeyDown={handleKeyDown}
					onBlur={() => setEditMode(false)}
					className="max-sm:text-sm"
				/>
			) : (
				<p onClick={() => setEditMode(true)} className="cursor-pointer">
					{initialText}
				</p>
			)}
		</div>
	);
};
