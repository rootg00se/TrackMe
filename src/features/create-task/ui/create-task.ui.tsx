import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button, Input } from "@/shared/components/ui";
import { useCreateTask } from "../model/useCreateTask";
import { DatePopover } from "./date-popover.ui";
import { toast } from "react-toastify";
import { LabelPopover } from "./label-popover.ui";

export const CreateTask: React.FC<{ trackerId: number }> = ({ trackerId }) => {
    const [createMode, setCreateMode] = useState(false);
    const [text, setText] = useState("");

    const [addLabelIds, setAddLabelIds] = useState<number[]>([]);

    const [startDate, setStartDate] = useState<Date | undefined>();
    const [targetDate, setTargetDate] = useState<Date | undefined>();

    const { createTaskFunc, isCreateTaskPending } = useCreateTask();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCreateTask = () => {
        if (!text) return toast.error("Задача не может быть пустой!");

        createTaskFunc({
            taskTrackerId: trackerId,
            text,
            startDate: startDate && startDate.toISOString(),
            targetDate: targetDate && targetDate.toISOString(),
            labelIds: addLabelIds?.length ? addLabelIds : undefined,
        });

        inputRef.current?.focus();

        setText("");
        setStartDate(undefined);
        setTargetDate(undefined);
        setAddLabelIds([]);
    };

    return (
        <div>
            {createMode ? (
                <div className="">
                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus={true}
                        className="mb-2 bg-white max-sm:text-sm"
                        placeholder="Придумайте задачу"
                        onKeyDown={(e) => e.key === "Enter" && handleCreateTask()}
                    />
                    <DatePopover
                        setStartDate={setStartDate}
                        setTargetDate={setTargetDate}
                        startDate={startDate}
                        targetDate={targetDate}
                    />
                    <LabelPopover addLabelIds={addLabelIds} setAddLabelIds={setAddLabelIds} />
                    <div className="flex items-center gap-3">
                        <Button
                            disabled={isCreateTaskPending}
                            onClick={handleCreateTask}
                            size="sm"
                            className="max-h-7 text-[12px]"
                        >
                            Создать
                        </Button>
                        <X size={18} onClick={() => setCreateMode(false)} />
                    </div>
                </div>
            ) : (
                <div
                    className="flex p-3 py-2 text-muted-foreground cursor-pointer items-center bg-card rounded-md border gap-2"
                    onClick={() => setCreateMode(true)}
                >
                    <Plus size={16} />
                    <p className="text-xs">Добавить задачу</p>
                </div>
            )}
        </div>
    );
};
