import { invoke } from "@tauri-apps/api/core";
import { Label } from "../model/types";

export const lablesApi = {
    baseKey: "labels",
    listLabels: () => invoke<Label[]>("list_labels"),
    createLabel: (input: { color: string; text: string }) => {
        return invoke<Label>("create_label", { input });
    },
    deleteLabel: (id: number) => invoke<void>("delete_label", { id }),
};
