import { useQuery } from "@tanstack/react-query";
import { taskTrackersApi } from "../api/task-tracker.api";

export const useBoard = () => {
    const { data, isPending } = useQuery({
        queryKey: [taskTrackersApi.baseKey],
        queryFn: () => taskTrackersApi.getBoard(),
        select: data => data,
    });

    return {
        boardData: data,
        isBoardPending: isPending
    }
}