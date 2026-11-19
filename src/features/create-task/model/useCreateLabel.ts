import { queryClient } from "@/app/providers/query-client";
import { lablesApi } from "@/entities/labels";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateLabel = () => {
    const createLabelMutation = useMutation({
        mutationKey: [lablesApi.baseKey, "create"],
        mutationFn: (data: { color: string, text:string }) => lablesApi.createLabel(data),
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [lablesApi.baseKey] });
        },
    });

    return {
        isCreateLabelPending: createLabelMutation.isPending,
        createLabelFunc: createLabelMutation.mutate,
        isCreateLabelSuccess: createLabelMutation.isSuccess,
    };
};