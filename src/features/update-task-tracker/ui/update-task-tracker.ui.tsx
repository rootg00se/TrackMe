import { Input } from "@/shared/components/ui";
import React, { useState } from "react";
import { useUpdateTracker } from "../model/useUpdateTracker";

interface IUpdateTrackerProps {
    name: string;
    trackerId: number;
}

export const UpdateTracker: React.FC<IUpdateTrackerProps> = ({ name, trackerId }) => {
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(name);

    const { updateTrackerFunc } = useUpdateTracker();

    const handleUpdateTracker = () => {
        updateTrackerFunc({
            id: trackerId,
            name: newName
        });

        setEditMode(false);
    };

    return (
        <div className="flex h-7 w-full items-center">
            {editMode ? (
                <Input
                    autoFocus={true}
                    onChange={e => setNewName(e.target.value)}
                    value={newName}
                    className="w-full"
                    placeholder="Enter name"
                    onKeyDown={e => e.key === "Enter" && handleUpdateTracker()}
                    onBlur={() => setEditMode(false)}
                />
            ) : (
                <p onClick={() => setEditMode(true)} className="font-heading w-full cursor-pointer text-sm">
                    {name}
                </p>
            )}
        </div>
    );
};