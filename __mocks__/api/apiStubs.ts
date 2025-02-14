import { Action } from "@/entities/action";
import { Game } from "@/entities/game";
import { User } from "@/entities/user";

export const player: User = {
    userId: 1,
    gameId: 1,
    name: "Player Name",
    email: "test@mail.ru",
    sex: "female",
    role: "player",
    hasResources: false,
    message: "player message",
    actions: [],
    expectations: [],
};

export const partner: User = {
    userId: 2,
    gameId: 1,
    name: "Parntner Name",
    email: "test1@mail.ru",
    sex: "male",
    role: "partner",
    hasResources: false,
    message: "partner message",
    actions: [],
    expectations: [],
};

export const game: Game = {
    gameId: 1,
    gameHash: "test",
    currentUserRole: "player",
    users: [player, partner],
};

export const greenActions: Action[] = [
    {
        actionId: 1,
        title: "Action 1 green",
        estimate: 100,
        partnerEstimate: null,
        type: "green",
        userId: player.userId,
    },
    {
        actionId: 2,
        title: "Action 2 green",
        estimate: null,
        partnerEstimate: 50,
        type: "green",
        userId: player.userId,
    },
];

export const yellowActions: Action[]  = [
    {
        actionId: 3,
        title: "Action 3 yellow",
        estimate: 100,
        partnerEstimate: null,
        type: "yellow",
        userId: player.userId,
    },
    {
        actionId: 4,
        title: "Action 4 yellow",
        estimate: null,
        partnerEstimate: null,
        type: "yellow",
        userId: player.userId,
    },
];
export const grayActions: Action[]  = [
    {
        actionId: 5,
        title: "Action 5 gray",
        estimate: 100,
        partnerEstimate: null,
        type: "gray",
        userId: partner.userId,
    },
    {
        actionId: 6,
        title: "Action 6 gray",
        estimate: null,
        partnerEstimate: null,
        type: "gray",
        userId: partner.userId,
    },
];
export const blueActions: Action[]  = [
    {
        actionId: 7,
        title: "Action 7 blue",
        estimate: 100,
        partnerEstimate: null,
        type: "blue",
        userId: partner.userId,
    },
    {
        actionId: 8,
        title: "Action 8 blue",
        estimate: null,
        partnerEstimate: null,
        type: "blue",
        userId: partner.userId,
    },
];
