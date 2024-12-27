export const player = {
    userId: 1,
    gameId: 1,
    name: "Player Name",
    email: "test@mail.ru",
    sex: "female",
    role: "player",
    hasResources: null,
    createdAt: "2024-11-07T10:59:38.554Z",
    updatedAt: "2024-11-07T10:59:38.554Z",
};

export const partner = {
    userId: 2,
    gameId: 1,
    name: "Parntner Name",
    email: "test1@mail.ru",
    sex: "male",
    role: "partner",
    hasResources: "false",
    createdAt: "2024-11-07T11:03:57.168Z",
    updatedAt: "2024-12-19T10:24:35.588Z",
};

export const game = {
    gameId: 1,
    gameHash: "test",
    currentUserRole: "player",
    createdAt: "2024-11-07T06:32:56.312Z",
    updatedAt: "2024-11-07T06:32:56.312Z",
    users: [player, partner],
};
