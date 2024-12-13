import { ClientExpectation, User } from "../interfaces/game";
import { createClientExpectation } from "./createClientExpectation";

export const createClientExpectations = (
    num: number,
    user: User
): ClientExpectation[] => {
    return new Array(num).fill(null).map(() => {
        return createClientExpectation(user);
    });
};