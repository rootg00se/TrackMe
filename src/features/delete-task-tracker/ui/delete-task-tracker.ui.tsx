import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/components/ui";
import { Trash } from "lucide-react";
import React from "react";
import { useDeleteTracker } from "../model/useDeleteTracker";

export const DeleteTracker: React.FC<{ trackerId: number }> = ({ trackerId }) => {
    const { deleteTrackerFunc } = useDeleteTracker();

    const handleDeleteTracker = () => {
        deleteTrackerFunc({ id: trackerId });
    };

    return (
        <div className="flex items-center gap-2 text-muted-foreground">
            <AlertDialog>
                <AlertDialogTrigger className="cursor-pointer">
                    <Trash size={16} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Вы точно уверены, что хотите удалить трекер?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Это действие не может быть отменена. Нажав кнопку "Удалить" вы
                            безвозвратно удалить этот трекер и все связанные с ним данные.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteTracker}>Удалить</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
