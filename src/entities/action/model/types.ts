export type ActionType = "green" | "yellow" | "blue" | "gray";

export interface Action {
    actionId: number;
    estimate: number | null;
    partnerEstimate: number | null;
    title: string;
    type: ActionType;
    userId: number;
}

export interface ClientAction extends Action {
    client: boolean;
}

export type ActionToCreate = Pick<Action, "userId" | "type" | "title">;

export type CreateActionsRequest = ActionToCreate[];

export type GetActionsByTypeRequest = { type: ActionType; userId: number }