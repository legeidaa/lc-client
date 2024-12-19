import { ClientExpectation } from "@/entities/expectation";
import { User } from "@/entities/user";

export const createClientExpectation = (user: User): ClientExpectation => {
    return {
        userId: user.userId,
        title: "",
        expectationId: Date.now() + Math.random(),
        client: true,
    };
};