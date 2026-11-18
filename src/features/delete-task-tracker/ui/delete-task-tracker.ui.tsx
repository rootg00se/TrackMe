import { Ellipsis, Plus } from "lucide-react";
import React from "react";

export const DeleteTracker: React.FC<{ trackerId: string }> = ({ trackerId }) => {
    // const { deleteFunc } = useDeleteTracker(projectId);

    const handleDeleteTracker = () => {
        // deleteFunc({ trackerId });
    };

    return (
        <div className="flex items-center gap-2 text-muted-foreground">
            <Ellipsis size={16} />
            <Plus size={16} />
{/* 			<AlertDialog>
                <AlertDialogTrigger asChild className="cursor-pointer">
                    <Trash size={20} className="text-primary" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы точно уверены, что хотите удалить трекер?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Это действие не может быть отменена. Нажав кнопку "Удалить" вы безвозвратно удалить этот
                            трекер и все связанные с ним данные.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteTracker}>Удалить</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </div>
    );
};