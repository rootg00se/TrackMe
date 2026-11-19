import { queryClient } from "@/app/providers/query-client";
import { taskTrackersApi } from "@/entities/task-tracker";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteTracker = () => {
    const deleteTrackerMutation = useMutation({
        mutationKey: [taskTrackersApi.baseKey, "delete"],
        mutationFn: ({ id }: { id: number }) => taskTrackersApi.deleteTracker(id),
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskTrackersApi.baseKey] });
        },
    });

    return {
        isDeleteTrackerPenfing: deleteTrackerMutation.isPending,
        deleteTrackerFunc: deleteTrackerMutation.mutate,
        isDeleteTrackerSuccess: deleteTrackerMutation.isSuccess,
    };
};