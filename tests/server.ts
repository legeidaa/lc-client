import {
    blueActions,
    game,
    grayActions,
    greenActions,
    yellowActions,
} from "__mocks__/api/apiStubs";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
    http.get(process.env.NEXT_PUBLIC_API_URL + "game/:hash", ({}) => {
        return HttpResponse.json(game);
    }),

    http.get(
        process.env.NEXT_PUBLIC_API_URL + "action/by-type",
        ({ request }) => {
            const url = new URL(request.url);
            const type = url.searchParams.get("type");

            if (type === "green") {
                return HttpResponse.json(greenActions);
            }

            if (type === "yellow") {
                return HttpResponse.json(yellowActions);
            }

            if (type === "gray") {
                return HttpResponse.json(grayActions);
            }

            if (type === "blue") {
                return HttpResponse.json(blueActions);
            }
            return HttpResponse.json([]);
        }
    ),
    http.delete(
        process.env.NEXT_PUBLIC_API_URL + "action/:id",
        ({ params }) => {
            console.log(`Captured a "DELETE /action/${params.id}" request`);
        }
    ),
];

export const server = setupServer(...handlers);
