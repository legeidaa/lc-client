import { Action, ClientAction } from "@/entities/action";

export const isClientAction = (
    action: ClientAction | Action
): action is ClientAction => {
    return (action as ClientAction).client !== undefined;
};
