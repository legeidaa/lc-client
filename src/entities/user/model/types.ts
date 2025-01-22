import { Action } from "@/entities/action";
import { Expectation } from "@/entities/expectation";

export type Sex = "male" | "female";
export type Role = "player" | "partner";

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

export interface UpdateResourcesRequest {
    userId: number;
    hasResources: boolean;
}

export interface UpdateMessageRequest {
    userId: number;
    message: string;
}
