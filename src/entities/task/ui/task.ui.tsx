import React from "react";

import { Calendar, MessageSquare, MessagesSquare, UserRoundPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui";

import testLogo from "/test-1.png";

interface ITaskProps {
	contentSlot: React.ReactNode;
	statusSlot: React.ReactNode;
	menuSlot: React.ReactNode;
}

export const Task: React.FC<ITaskProps> = ({ contentSlot, statusSlot, menuSlot }) => {
	return (
		<div className="group bg-card relative rounded-md border p-3">
			<div className="absolute top-3 right-3 flex items-center gap-1">
				<div className="text-muted-foreground h-6 w-6 border-dashed border rounded-full flex items-center justify-center p-1">
					<UserRoundPlus className="-mr-0.5" size={14} />
				</div>
				<Avatar className="mb-0.5 h-6 w-6">
					<AvatarImage src={testLogo} />
					<AvatarFallback className="text-lg">DE</AvatarFallback>
				</Avatar>
			</div>
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