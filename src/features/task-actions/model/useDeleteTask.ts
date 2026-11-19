import { queryClient } from "@/app/providers/query-client";
import { tasksApi } from "@/entities/task";
import { taskTrackersApi } from "@/entities/task-tracker";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteTask = () => {
    const deleteTaskMutation = useMutation({
        mutationKey: [tasksApi.baseKey, "delete"],
        mutationFn: ({ id }: { id: number }) => tasksApi.deleteTask(id),
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isDeleteTaskPenfing: deleteTaskMutation.isPending,
        deleteTaskFunc: deleteTaskMutation.mutate,
        isDeleteTaskSuccess: deleteTaskMutation.isSuccess,
    };
};
