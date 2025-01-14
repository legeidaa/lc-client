
import { Action, ActionToCreate, CreateActionsRequest } from "@/entities/action";
import { CreateExpectationRequest, Expectation, ExpectationToCreate } from "@/entities/expectation";
import { User } from "@/entities/user";
import { MutableRefObject, SetStateAction } from "react";

export const saveInputsListData = async <T extends Action | Expectation>(
    clientItems: T[],
    isClientFunction: (item: T) => boolean,
    createFunction: (
        items: T extends Action
            ? CreateActionsRequest
            : CreateExpectationRequest
    ) => Promise<unknown>,
    updateFunction: (items: T[]) => Promise<unknown>,
    setIsSomeFieldsEmpty: (value: SetStateAction<boolean>) => void,
    user: User,
    isUpdated: MutableRefObject<boolean>
) => {
    const isSomeFieldsEmpty = clientItems.some(
        (item) => !("title" in item && item.title)
    );
    if (isSomeFieldsEmpty) {
        setIsSomeFieldsEmpty(true);
        return;
    }

    const itemsToUpdate: T[] = [];

    const actionsToCreate: CreateActionsRequest = [];
    const expectationsToCreate: CreateExpectationRequest = [];

    clientItems.forEach((item) => {
        if (isClientFunction(item)) {
            if ("type" in item) {
                const actionToCreate: ActionToCreate = {
                    title: item.title,
                    type: item.type,
                    userId: user.userId,
                };
                actionsToCreate.push(actionToCreate);
            } else {
                const expectationToCreate: ExpectationToCreate = {
                    title: item.title,
                    userId: user.userId,
                };
                expectationsToCreate.push(expectationToCreate);
            }
        } else {
            itemsToUpdate.push(item);
        }
    });

    const itemsToCreate = [
        ...actionsToCreate,
        ...expectationsToCreate,
    ] as T extends Action ? CreateActionsRequest : CreateExpectationRequest;

    const queries = [];
    if (itemsToCreate.length > 0) {
        queries.push(createFunction(itemsToCreate));
    }
    if (itemsToUpdate.length > 0) {
        queries.push(updateFunction(itemsToUpdate));
    }

    Promise.all(queries)
        .then(() => {
            setIsSomeFieldsEmpty(false);
            isUpdated.current = true;
        })
        .catch((e) => {
            throw new Error(e);
        });
};
