import { Action } from "@reduxjs/toolkit";
import { ClientAction } from "../interfaces/game";

export const isClientAction = (
    action: ClientAction | Action
): action is ClientAction => {
    return (action as ClientAction).client !== undefined;
};
