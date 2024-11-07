export type Sex = "male" | "female";
export type Role = "player" | "partner";
export type ActionType = "green" | "yellow" | "blue" | "gray";

export interface Expectation {
    expectationId: number;
    title: string;
    userId: number;
}

export interface Action {
    actionId: number;
    cost: number;
    title: string;
    type: ActionType;
    userId: number;
}

export interface User {
    userId: number;
    gameId: number;
    name: string;
    email: string;
    sex: Sex;
    role: Role;
    hasResources: boolean;
    message: string;
}

export interface CreateUserRequest {
    gameId: number;
    name: string;
    email: string;
    sex: Sex;
    role: Role;
}

export interface Game {
    gameId: number;
    gameHash: string;
    currentUserRole: string;
    users: User[];
}
