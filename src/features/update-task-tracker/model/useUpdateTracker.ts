import { queryClient } from "@/app/providers/query-client";
import { taskTrackersApi } from "@/entities/task-tracker"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateTracker = () => {
    const updateTrackerMutation = useMutation({
        mutationKey: [taskTrackersApi.baseKey, "create"],
        mutationFn: ({ id, name }: { id: number, name: string }) => taskTrackersApi.renameTracker(id, name),
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isUpdateTrackerPenfing: updateTrackerMutation.isPending,
        updateTrackerFunc: updateTrackerMutation.mutate,
        isUpdateTrackerSuccess: updateTrackerMutation.isSuccess,
    };
};
