import { Role, User } from "@/entities/user";
import { Game } from "../model/types";

export function getGameUser(game: Game | undefined, role: Role): User {
    return game?.users.find((u) => u.role === role) as User;
}
