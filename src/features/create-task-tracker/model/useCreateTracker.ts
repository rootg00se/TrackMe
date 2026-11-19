import { queryClient } from "@/app/providers/query-client";
import { taskTrackersApi } from "@/entities/task-tracker";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateTracker = () => {
    const createTrackerMutation = useMutation({
        mutationKey: [taskTrackersApi.baseKey, "create"],
        mutationFn: taskTrackersApi.createTracker,
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isCreateTrackerPending: createTrackerMutation.isPending,
        createTrackerFunc: createTrackerMutation.mutate,
        isCreateTrackerSuccess: createTrackerMutation.isSuccess,
    };
};