import { createClientActions } from "./createClientActions";
import { User } from "@/entities/user";

describe("createClientActions", () => {
    const mockUser: User = {
        userId: 1,
        gameId: 1,
        name: "Test User",
        email: "test@example.com",
        sex: "male",
        role: "player",
        hasResources: true,
        message: "",
        actions: [],
        expectations: [],
    };

    test("creates the correct number of client actions", () => {
        const numActions = 5;
        const actions = createClientActions(numActions, mockUser, "green");

        expect(actions).toHaveLength(numActions);
        actions.forEach((action) => {
            expect(action).toMatchObject({
                userId: mockUser.userId,
                estimate: null,
                title: "",
                type: "green",
                client: true,
            });
        });
    });

    test("creates client actions with unique actionIds", () => {
        const numActions = 10;
        const actions = createClientActions(numActions, mockUser, "yellow");

        const actionIds = actions.map((action) => action.actionId);
        const uniqueActionIds = new Set(actionIds);

        expect(uniqueActionIds.size).toBe(numActions); // Ensure all actionIds are unique
    });

    test("creates client actions with correct type", () => {
        const numActions = 4;
        const actionType = "gray";
        const actions = createClientActions(numActions, mockUser, actionType);

        actions.forEach((action) => {
            expect(action.type).toBe(actionType);
        });
    });

    test("returns an empty array when num is 0", () => {
        const actions = createClientActions(0, mockUser, "green");
        expect(actions).toHaveLength(0);
    });
});
