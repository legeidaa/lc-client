import { CreateUserRequest, Game, User } from "@/shared/interfaces/game";
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

        getUsers: builder.query<User[], string>({
            query: (hash) => `user/${hash}`,
            providesTags: ["User"],
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
    useCreatePairMutation
} = gameApi;
