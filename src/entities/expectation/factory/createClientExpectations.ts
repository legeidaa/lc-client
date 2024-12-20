
import { User } from "@/entities/user";
import { ClientExpectation } from "../model/types";
import { createClientExpectation } from "./createClientExpectation";

export const createClientExpectations = (
    num: number,
    user: User
): ClientExpectation[] => {
    return new Array(num).fill(null).map(() => {
        return createClientExpectation(user);
    });
};