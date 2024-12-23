export interface Expectation {
    expectationId: number;
    title: string;
    userId: number;
}
export interface ClientExpectation extends Expectation {
    client: boolean;
}

export type ExpectationToCreate = Pick<Expectation, "title" | "userId">;

export type CreateExpectationRequest = Array<ExpectationToCreate>;
