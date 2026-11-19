import { queryClient } from "@/app/providers/query-client";
import { tasksApi } from "@/entities/task";
import { taskTrackersApi } from "@/entities/task-tracker";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useChangeTracker = () => {
    const changeTrackerMutation = useMutation({
        mutationKey: [tasksApi.baseKey, "tracker"],
        mutationFn: ({ taskId, trackerId }: { taskId: number; trackerId: number }) =>
            tasksApi.moveTask(taskId, trackerId),
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [tasksApi.baseKey] });
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isChangeTrackerPending: changeTrackerMutation.isPending,
        changeTrackerFunc: changeTrackerMutation.mutate,
        isChangeTrackerSuccess: changeTrackerMutation.isSuccess,
    };
};
