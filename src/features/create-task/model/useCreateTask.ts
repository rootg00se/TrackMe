import { queryClient } from "@/app/providers/query-client";
import { tasksApi } from "@/entities/task";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateTask = () => {
    const createTaskMutation = useMutation({
        mutationKey: [tasksApi.baseKey, "create"],
        mutationFn: tasksApi.createTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["trackers"] });
        },
    });

    return {
        isCreateTaskPending: createTaskMutation.isPending,
        createTaskFunc: createTaskMutation.mutate,
        isCreateTaskSuccess: createTaskMutation.isSuccess,
    };
};