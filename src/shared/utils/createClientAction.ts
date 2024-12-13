import { ActionType, ClientAction, User } from "../interfaces/game";

export const createClientAction = (
    user: User,
    actionsType: ActionType
): ClientAction => {
    return {
        userId: user.userId,
        estimate: null,
        title: "",
        type: actionsType,
        actionId: Date.now() + Math.random(),
        client: true,
    };
};