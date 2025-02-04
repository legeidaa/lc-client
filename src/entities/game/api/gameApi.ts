import { emptyGameApi } from "@/shared/api";
import { Game } from "../model/types";
import { Role } from "@/entities/user";

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
            providesTags: ["Game"],
        }),

        changeCurrentUserRole: builder.mutation<Game, { hash: string; roleToUpdate: Role }>({
            query: (body) => ({
                url: "game/change-role",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Game"],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateGameMutation, useGetGameQuery, useLazyGetGameQuery, useChangeCurrentUserRoleMutation } =
    gameApi;
