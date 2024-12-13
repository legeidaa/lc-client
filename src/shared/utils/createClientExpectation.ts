import { ClientExpectation, User } from "../interfaces/game";

export const createClientExpectation = (user: User): ClientExpectation => {
    return {
        userId: user.userId,
        title: "",
        expectationId: Date.now() + Math.random(),
        client: true,
    };
};