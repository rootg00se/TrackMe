import { Button, Input } from "@/shared/components/ui";
import { cn } from "cn";
import { Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const CreateTaskTracker: React.FC = () => {
    // const { id: projectId } = useParams();

    const [createMode, setCreateMode] = useState(false);
    const [name, setName] = useState("");

    // const { createTrackerFunc, isCreateTrackerPending } = useCreateTracker();

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToMe = () => {
        setTimeout(() => {
            containerRef.current?.scrollIntoView({
                behavior: "smooth",
                inline: "end",
                block: "nearest"
            });
        }, 50);
    };

    const handleCreateTracker = () => {
        // if (!projectId) return toast.error("Что-то пошло не так");

        // createTrackerFunc({
        //     projectId,
        //     name
        // });

        inputRef.current?.focus();

        setName("");
        scrollToMe();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleCreateTracker();
        if (e.key === "Escape") setCreateMode(false);
    };

    useEffect(() => {
        if (createMode) {
            scrollToMe();
        }
    }, [createMode]);

    return (
        <div ref={containerRef}>
            {createMode ? (
                <div className="max-w-80 min-w-80 rounded-lg border-2 border-dashed p-3.5">
                    <Input
                        ref={inputRef}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus={true}
                        className="mb-3 max-sm:text-sm"
                        placeholder="Введите имя трекера"
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex items-center gap-3">
                        <Button disabled={false} onClick={handleCreateTracker}>
                            Создать
                        </Button>
                        <X onClick={() => setCreateMode(false)} />
                    </div>
                </div>
            ) : (
                <div
                    className={cn(
                        "flex shrink-0 items-center justify-center rounded-md text-muted-foreground border-2 border-dashed",
                        "hover:border-white hover:text-white min-h-37.5 transition-all",
                        "min-w-85 gap-2 font-medium shadow-sm"
                    )}
                    onClick={() => setCreateMode(true)}
                >
                    <Plus size={20} />
                    <span>Новая колонка</span>
                </div>
            )}
        </div>
    );
};