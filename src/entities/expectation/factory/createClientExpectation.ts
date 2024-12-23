
import { User } from "@/entities/user";
import { ClientExpectation } from "../model/types";

export const createClientExpectation = (user: User): ClientExpectation => {
    return {
        userId: user.userId,
        title: "",
        expectationId: Date.now() + Math.random(),
        client: true,
    };
};