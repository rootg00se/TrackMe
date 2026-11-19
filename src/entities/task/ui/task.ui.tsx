import React from "react";

import { Calendar } from "lucide-react";

interface ITaskProps {
	contentSlot: React.ReactNode;
	statusSlot: React.ReactNode;
	menuSlot: React.ReactNode;
}

export const Task: React.FC<ITaskProps> = ({ contentSlot, statusSlot, menuSlot }) => {
	return (
		<div className="group bg-card relative rounded-md border p-3">
			<div className="mb-2.5">
				<div className="mb-2">{statusSlot}</div>
				<p className="text-[14px]">{contentSlot}</p>
			</div>
			<div className="flex items-center gap-2 text-[11px]">
				<div className="flex items-center gap-1">
					<Calendar size={13} />
					<p>12 Sep</p>
				</div>
				<span>-</span>
				<div className="flex items-center gap-1">
					<Calendar size={13} />
					<p>12 Sep</p>
				</div>
			</div>
		</div>
	);
};