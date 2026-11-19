import React from "react";

interface IChangeTaskStatusProps {
    labels: string[];
}

export const ChangeTaskStatus: React.FC<IChangeTaskStatusProps> = ({ labels }) => {
	if (!labels || !labels.length) return;

    return (
        <div className="flex mb-2 flex-wrap gap-x-2 gap-y-1">
            {labels.map((color, index) => (
                <span
                    key={index}
                    className={`block h-1.5 min-w-10 rounded`}
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
};
