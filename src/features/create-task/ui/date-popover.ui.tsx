import React from "react";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui";
import { ChevronDownIcon } from "lucide-react";
import moment from "moment";

type DatePopoverProps = {
    startDate: Date | undefined;
    targetDate: Date | undefined;
    setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setTargetDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export const DatePopover: React.FC<DatePopoverProps> = ({
    startDate,
    targetDate,
    setStartDate,
    setTargetDate,
}) => {
    return (
        <div className="flex mb-2 items-center gap-5 justify-between">
            <Popover>
                <PopoverTrigger
                    render={
                        <Button
                            variant={"outline"}
                            data-empty={!startDate}
                            className="w-[45%] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                            {startDate ? (
                                moment(startDate).format("D MMM")
                            ) : (
                                <span>Начальная дата</span>
                            )}
                            <ChevronDownIcon data-icon="inline-end" />
                        </Button>
                    }
                />
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        defaultMonth={startDate}
                    />
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger
                    render={
                        <Button
                            variant={"outline"}
                            data-empty={!targetDate}
                            className="w-[45%] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                        >
                            {targetDate ? (
                                moment(targetDate).format("D MMM")
                            ) : (
                                <span>Конечная дата</span>
                            )}
                            <ChevronDownIcon data-icon="inline-end" />
                        </Button>
                    }
                />
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={targetDate}
                        onSelect={setTargetDate}
                        defaultMonth={targetDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
