import { game } from "__mocks__/api/apiStubs";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
    http.get("http://localhost:3001/api/game/*", () => {
        return HttpResponse.json(game);
    }),
    // http.post("http://localhost:3001/api/user/pair", () => {
    //     return HttpResponse.json([player, partner]);
    // }),
];

export const server = setupServer(...handlers);
