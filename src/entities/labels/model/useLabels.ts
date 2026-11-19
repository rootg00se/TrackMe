import { useQuery } from "@tanstack/react-query";
import { lablesApi } from "../api/label.api";

export const useLabels = () => {
    const { data, isPending } = useQuery({
        queryKey: [lablesApi.baseKey],
        queryFn: () => lablesApi.listLabels(),
        select: (data) => data,
    });

    return {
        labelsData: data,
        isLabelsPending: isPending,
    };
};
