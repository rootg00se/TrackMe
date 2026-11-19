import React from "react";

import { Calendar } from "lucide-react";
import moment from "moment";

interface ITaskProps {
    contentSlot: React.ReactNode;
    statusSlot: React.ReactNode;
    menuSlot: React.ReactNode;
    startDate?: string | null;
    endDate?: string | null;
}

export const Task: React.FC<ITaskProps> = ({
    contentSlot,
    statusSlot,
    menuSlot,
    startDate,
    endDate,
}) => {
    return (
        <div className="group bg-card relative rounded-md border p-3">
            <div>
                <div className="float-right">{menuSlot}</div>
                <div className="mb-2">{statusSlot}</div>
                <p className="text-[14px]">{contentSlot}</p>
            </div>
            {(startDate || endDate) && (
                <div className="flex mt-2.5 items-center gap-2 text-[11px]">
                    {startDate && (
                        <>
                            <div className="flex items-center gap-1">
                                <Calendar size={13} />
                                <p>{moment(startDate).format("D MMM").toLowerCase()}</p>
                            </div>
                            <span>-</span>
                        </>
                    )}
                    {endDate && (
                        <div className="flex items-center gap-1">
                            <Calendar size={13} />
                            <p>{moment(endDate).format("D MMM").toLowerCase()}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
