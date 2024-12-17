import { Game } from "@/shared/interfaces/game";
import { emptyGameApi } from "./emptyGameApi";

const gameApi = emptyGameApi.injectEndpoints({
    endpoints: (builder) => ({
        createGame: builder.mutation<Game, void>({
            query: () => ({
                url: "game",
                method: "POST",
            }),
        }),

        getGame: builder.query<Game, string>({
            query: (hash) => `game/${hash}`,
            providesTags: ["User"],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateGameMutation, useGetGameQuery, useLazyGetGameQuery } =
    gameApi;
