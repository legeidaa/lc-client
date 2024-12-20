import { Role, User } from "@/entities/user";

export interface Game {
    gameId: number;
    gameHash: string;
    currentUserRole: Role;
    users: User[];
}
