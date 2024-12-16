import {
    useDeleteActionMutation,
    useDeleteExpectationMutation,
} from "@/lib/redux/gameApi";
import { Action, Expectation } from "@/shared/interfaces/game";
import { SetStateAction } from "react";

type DeleteFunctionType<T> = T extends Action
    ? ReturnType<typeof useDeleteActionMutation>[0]
    : ReturnType<typeof useDeleteExpectationMutation>[0];

export const deleteInputItem = async <T extends Action | Expectation>(
    itemId: number,
    clientItems: T[],
    isClientFunction: (item: T) => boolean,
    setBtnToDelete: (value: SetStateAction<number | null>) => void,
    deleteFunction: DeleteFunctionType<T>
) => {
    const toDelete = clientItems.find((item) => {
        if ("actionId" in item) {
            return item.actionId === itemId;
        } else if ("expectationId" in item) {
            return item.expectationId === itemId;
        } else return false;
    });

    if (!toDelete) throw new Error("Nothing to delete");

    if (isClientFunction(toDelete)) {
        setBtnToDelete(itemId);
    } else {
        setBtnToDelete(itemId);
        await deleteFunction(itemId);
    }
};
