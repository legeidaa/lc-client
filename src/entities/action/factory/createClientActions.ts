
import { User } from "@/entities/user";
import { createClientAction } from "./createClientAction";
import { ActionType, ClientAction } from "../model/types";

export const createClientActions = (num: number, user: User, actionsType: ActionType): ClientAction[] => {
    return new Array(num).fill(null).map(() => {
        return createClientAction(user, actionsType);
    });
};