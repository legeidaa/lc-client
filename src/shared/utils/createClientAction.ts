import { ActionType, ClientAction, User } from "../interfaces/game";

export const createClientAction = (
    user: User,
    actionsType: ActionType
): ClientAction => {
    return {
        userId: user.userId,
        cost: null,
        title: "",
        type: actionsType,
        actionId: Date.now() + Math.random(),
        // помечаем, что это созданный на клиенте action
        client: true,
    };
};