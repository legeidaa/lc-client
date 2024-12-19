import { ClientExpectation } from "@/entities/expectation";
import { createClientExpectation } from "./createClientExpectation";
import { User } from "@/entities/user";

export const createClientExpectations = (
    num: number,
    user: User
): ClientExpectation[] => {
    return new Array(num).fill(null).map(() => {
        return createClientExpectation(user);
    });
};