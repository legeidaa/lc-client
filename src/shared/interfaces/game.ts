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
    cost: number | null;
    title: string;
    type: ActionType;
    userId: number;
}

export interface ClientAction extends Action {
    client: boolean;
}

export type CreateActionsRequest = Array<
    Pick<Action, "userId" | "type" | "title">
>;

export interface User {
    userId: number;
    gameId: number;
    name: string;
    email: string;
    sex: Sex;
    role: Role;
    hasResources: boolean;
    message: string;
    actions: Action[];
    expectations: Expectation[];
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
    currentUserRole: Role;
    users: User[];
}


export interface UpdateResourcesRequest {
    userId: number;
    hasResources: boolean;
}