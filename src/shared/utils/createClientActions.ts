import { ActionType, ClientAction, User } from "../interfaces/game";
import { createClientAction } from "./createClientAction";

export const createClientActions = (num: number, user: User, actionsType: ActionType): ClientAction[] => {
    return new Array(num).fill(null).map(() => {
        return createClientAction(user, actionsType);
    });
};