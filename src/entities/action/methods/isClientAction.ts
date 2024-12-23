import { Action, ClientAction } from "../model/types";

export const isClientAction = (
    action: ClientAction | Action
): action is ClientAction => {
    return (action as ClientAction).client !== undefined;
};
