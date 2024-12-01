import { ActionType, Role } from "../interfaces/game";

export const getActionsType = (
    role: Role,
    pageName: "pl-to-pr" | "pr-to-pl"
): ActionType => {
    if (role === "player") {
        if (pageName === "pl-to-pr") return "green";
        if (pageName === "pr-to-pl") return "yellow";
    }
    if (role === "partner") {
        if (pageName === "pl-to-pr") return "blue";
        if (pageName === "pr-to-pl") return "gray";
    }
    return "green";
};
