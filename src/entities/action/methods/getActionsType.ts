import {
    UserPagesNames as names,
    userPagesNamesWithActions,
} from "@/shared/config/UserPagesNames";
import { Role } from "@/entities/user";
import { ActionType } from "../model/types";

export const getActionsType = (
    role: Role,
    pageName: (typeof userPagesNamesWithActions)[number]
): ActionType => {
    if (role === "player") {
        if (
            pageName === names.PLAYER_TO_PARTNER ||
            pageName === names.PLAYER_TO_PARTNER_ESTIMATE
        ) {
            return "green";
        }
        if (
            pageName === names.PARTNER_TO_PLAYER ||
            pageName === names.PARTNER_TO_PLAYER_ESTIMATE
        ) {
            return "yellow";
        }
        if (pageName === names.PARTNER_TO_PLAYER_FILLED_ESTIMATE) {
            return "blue";
        }
    } else if (role === "partner") {
        if (
            pageName === names.PLAYER_TO_PARTNER ||
            pageName === names.PLAYER_TO_PARTNER_ESTIMATE
        ) {
            return "blue";
        }
        if (
            pageName === names.PARTNER_TO_PLAYER ||
            pageName === names.PARTNER_TO_PLAYER_ESTIMATE
        ) {
            return "gray";
        }
    }
    throw new Error("Нельзя получить тип действия");
};
