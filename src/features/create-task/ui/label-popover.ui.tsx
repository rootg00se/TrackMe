import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui";
import { useLabels } from "@/entities/labels";
import { useCreateLabel } from "../model/useCreateLabel";

const tagColorMap = [
    { tagColor: "bg-tag-0", defaultColor: "#ff8274" },
    { tagColor: "bg-tag-1", defaultColor: "#81e0af" },
    { tagColor: "bg-tag-2", defaultColor: "#6b8d69" },
    { tagColor: "bg-tag-4", defaultColor: "#203c56" },
    { tagColor: "bg-tag-5", defaultColor: "#7c183c" },
    { tagColor: "bg-tag-6", defaultColor: "#8d697a" },
];

type LabelPopoverProps = {
    addLabelIds: number[],
    setAddLabelIds: React.Dispatch<React.SetStateAction<number[]>>,
}

export const LabelPopover: React.FC<LabelPopoverProps> = ({ addLabelIds, setAddLabelIds }) => {
    const [labelTexts, setLabelTexts] = useState<Record<string, string>>({});

    const { createLabelFunc } = useCreateLabel();
    const { labelsData } = useLabels();

    const handleCreateLabel = (text: string, color: string) => {
        if (!text.trim()) return;

        createLabelFunc({ text: text.trim(), color });

        setLabelTexts((prev) => ({
            ...prev,
            [tagColorMap.find((item) => item.defaultColor === color)?.tagColor ?? ""]: "",
        }));
    };

    return (
        <div className="mb-2">
            <Popover>
                <PopoverTrigger
                    render={
                        <Button
                            variant={"outline"}
                            className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                            <span>Выбрать метки</span>
                            <ChevronDownIcon data-icon="inline-end" />
                        </Button>
                    }
                />
                <PopoverContent>
                    <div>
                        {labelsData
                            ?.filter((label) => !addLabelIds.includes(label.labelId))
                            .map((label) => (
                                <div
                                    key={label.labelId}
                                    className="flex p-2 rounded-sm hover:bg-background items-center gap-2"
                                    onClick={() =>
                                        setAddLabelIds((prev) => [...prev, label.labelId])
                                    }
                                >
                                    <div
                                        className="w-3 h-3 rounded-sm"
                                        style={{ backgroundColor: label.color }}
                                    />
                                    <p>{label.text}</p>
                                </div>
                            ))}
                    </div>
                    <Popover>
                        <PopoverTrigger render={<Button>Создать метки</Button>}></PopoverTrigger>
                        <PopoverContent>
                            {tagColorMap.map((color) => (
                                <div className="flex items-center gap-3">
                                    <div className={`${color.tagColor} rounded-sm w-4 h-4`}></div>
                                    <Input
                                        placeholder="Введите имя метки"
                                        className="max-w-40"
                                        value={labelTexts[color.tagColor] ?? ""}
                                        onChange={(e) =>
                                            setLabelTexts((prev) => ({
                                                ...prev,
                                                [color.tagColor]: e.target.value,
                                            }))
                                        }
                                    />
                                    <Button
                                        onClick={() =>
                                            handleCreateLabel(
                                                labelTexts[color.tagColor],
                                                color.defaultColor,
                                            )
                                        }
                                    >
                                        Создать
                                    </Button>
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
                </PopoverContent>
            </Popover>
        </div>
    );
};
