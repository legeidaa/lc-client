import { game } from "__mocks__/api/apiStubs";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
    http.get(process.env.NEXT_PUBLIC_API_URL + "game/:hash", () => {
        return HttpResponse.json(game);
    }),

    http.get(process.env.NEXT_PUBLIC_API_URL + "action/by-type", () => {
        return HttpResponse.json([
            {
                actionId: 1,
                title: "Action 1",
                estimate: null,
                type: "green",
                userId: 1,
            },
            {
                actionId: 2,
                title: "Action 2",
                estimate: null,
                type: "green",
                userId: 1,
            },
        ]);
    }),
    http.delete(process.env.NEXT_PUBLIC_API_URL + "action/:id", ({ params }) => {
        console.log(`Captured a "DELETE /action/${params.id}" request`);
    }),
];

export const server = setupServer(...handlers);
