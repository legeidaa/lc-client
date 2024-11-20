import {
    CreateUserRequest,
    Game,
    User,
} from "@/shared/interfaces/game";
import { Action } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiUrl = "http://localhost:3001/api/";

export const gameApi = createApi({
    reducerPath: "gameApi",
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["User"],
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

        createUser: builder.mutation<User, CreateUserRequest>({
            query: (user) => ({
                url: "user",
                method: "POST",
                body: user,
            }),
        }),
        createPair: builder.mutation<User[], CreateUserRequest[]>({
            query: (user) => ({
                url: "user/pair",
                method: "POST",
                body: user,
            }),
        }),

        // updateUser: builder.mutation<User, User>({
        //     query: (user) => ({
        //         url: `user/${user.userId}`,
        //         method: "PATCH",
        //         body: user,
        //     }),
        //     invalidatesTags: ['User'],
        // }),

        getUsers: builder.query<User[], number>({
            query: (hash) => `user/${hash}`,
            providesTags: ["User"],
        }),

        createOrUpdateActions: builder.mutation<Action[], Action[]>({
            query: (actions) => ({
                url: "action",
                method: "POST",
                body: actions,
            }),
        }),

        getActionsByUser: builder.query<Action[], number>({
            query: (userId) => `action/by-user?userId=${userId}`,
        }),

        getActionsByType: builder.query<Action[], { type: string , userId: number}>({
            query: ({ type, userId }) => {
                return `action/by-type?userId=${userId}&type=${type}`
            },
        }),

    }),
});

export const {
    useCreateGameMutation,
    useGetGameQuery,
    useLazyGetGameQuery,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useCreateUserMutation,
    useCreatePairMutation,
    useCreateOrUpdateActionsMutation,
    useGetActionsByTypeQuery,
    useLazyGetActionsByTypeQuery,
    useGetActionsByUserQuery,
    useLazyGetActionsByUserQuery
} = gameApi;
