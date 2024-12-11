export type Sex = "male" | "female";
export type Role = "player" | "partner";
export type ActionType = "green" | "yellow" | "blue" | "gray";

export interface Expectation {
    expectationId: number;
    title: string;
    userId: number;
}
export interface ClientExpectation extends Expectation {
    client: boolean;
}

export interface Action {
    actionId: number;
    estimate: number | null;
    title: string;
    type: ActionType;
    userId: number;
}

export interface ClientAction extends Action {
    client: boolean;
}

export type ActionToCreate = Pick<Action, "userId" | "type" | "title">;
export type CreateActionsRequest = Array<ActionToCreate>;

export type ExpectationToCreate = Pick<Expectation, "title" | "userId">;
export type CreateExpectationRequest = Array<ExpectationToCreate>;

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
