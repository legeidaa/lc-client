import { Game } from "@/shared/interfaces/game";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiUrl = 'http://localhost:3001/api/'

export const gameApi = createApi({
    reducerPath: "gameApi",
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        createGame: builder.mutation<Game, void>({
            query: () => ({
                url: "game",
                method: "POST",
            }),
        }),
        getGame: builder.query<Game, string>({
            query: (hash) => `game/${hash}`,
        }),
    }),
});

export const { useCreateGameMutation, useGetGameQuery, useLazyGetGameQuery } =
    gameApi;
