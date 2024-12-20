import { ActionType, ClientAction } from "@/entities/action";
import { User } from "@/entities/user";

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