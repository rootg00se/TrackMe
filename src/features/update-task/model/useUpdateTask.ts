import { queryClient } from "@/app/providers/query-client";
import { tasksApi } from "@/entities/task";
import { UpdateTaskDto } from "@/entities/task-tracker/model/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateTask = () => {
    const updateTaskMutation = useMutation({
        mutationKey: [tasksApi.baseKey, "create"],
        mutationFn: ({ id, data }: { id: number, data: UpdateTaskDto }) => tasksApi.updateTask(id, data),
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["trackers"] });
        },
    });

    return {
        isUpdateTaskPenfing: updateTaskMutation.isPending,
        updateTaskFunc: updateTaskMutation.mutate,
        isUpdateTaskSuccess: updateTaskMutation.isSuccess,
    };
};
