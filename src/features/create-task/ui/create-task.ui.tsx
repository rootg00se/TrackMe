import { useRef, useState } from "react";

import { Plus, X } from "lucide-react";

import { Button, Input } from "@/shared/components/ui";

// import { useCreateTask } from "../model/useCreateTask";

export const CreateTask: React.FC<{ trackerId: string }> = ({ trackerId }) => {
	const [createMode, setCreateMode] = useState(false);
	const [text, setText] = useState("");

	// const { createTaskFunc, isCreateTaskPending } = useCreateTask();

	const inputRef = useRef<HTMLInputElement>(null);

	const handleCreateTask = () => {
		// createTaskFunc({
		// 	trackerId,
		// 	text
		// });

		inputRef.current?.focus();
		setText("");
	};

	return (
		<div>
			{createMode ? (
				<div className="">
					<Input
						value={text}
						onChange={e => setText(e.target.value)}
						autoFocus={true}
						className="mb-3 bg-white max-sm:text-sm"
						placeholder="Придумайте задачу"
						onKeyDown={e => e.key === "Enter" && handleCreateTask()}
					/>
					<div className="flex items-center gap-3">
						<Button
							// disabled={isCreateTaskPending}
							onClick={handleCreateTask}
							size="sm"
							className="max-h-7 text-[12px]"
						>
							Создать
						</Button>
						<X onClick={() => setCreateMode(false)} />
					</div>
				</div>
			) : (
				<div className="flex p-3 py-2 text-muted-foreground cursor-pointer items-center bg-card rounded-md border gap-2" onClick={() => setCreateMode(true)}>
					<Plus size={16} />
					<p className="text-xs">Добавить задачу</p>
				</div>
			)}
		</div>
	);
};
