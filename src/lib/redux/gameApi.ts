import {
    Action,
    CreateActionsRequest,
    CreateUserRequest,
    Game,
    User,
} from "@/shared/interfaces/game";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiUrl = "http://localhost:3001/api/";

export const gameApi = createApi({
    reducerPath: "gameApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["User", "Action"],
    endpoints: (builder) => ({
        // game
        createGame: builder.mutation<Game, void>({
            query: () => ({
                url: "game",
                method: "POST",
            }),
        }),

        getGame: builder.query<Game, string>({
            query: (hash) => `game/${hash}`,
        }),

        // user
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

        // action
        // если передается без actionId, то создается новый, в ином случае обновляется
        // createOrUpdateActions: builder.mutation<Action[], Array<Action | Omit<Action, "actionId">> >({
        //     query: (actions) => ({
        //         url: "action",
        //         method: "POST",
        //         body: actions,
        //     }),
        //     invalidatesTags: ["Action"],
        // }),
        createActions: builder.mutation<Action, CreateActionsRequest>({
            query: (actions) => ({
                url: "action",
                method: "POST",
                body: actions,
            }),
            invalidatesTags: ["Action"],
            // invalidatesTags: (result, error, arg) =>
            //     result
            //         ? [
            //               {
            //                   type: "Action" as const,
            //                   id: result.actionId,
            //               },
            //               "Action",
            //           ]
            //         : ["Action"],
        }),

        updateActions: builder.mutation<Action[], Action[]>({
            query: (actions) => ({
                url: "action",
                method: "PATCH",
                body: actions,
            }),
            invalidatesTags: ["Action"],
            // invalidatesTags: (result, error, arg) =>
            //     result
            //         ? [
            //               ...result.map(({ actionId }) => ({
            //                   type: "Action" as const,
            //                   id: actionId,
            //               })),
            //               "Action",
            //           ]
            //         : ["Action"],
        }),

        getActionsByUser: builder.query<Action[], number>({
            query: (userId) => ({
                url: `action/by-user?userId=${userId}`,
            }),
            providesTags: ["Action"],
        }),

        getActionsByType: builder.query<
            Action[],
            { type: string; userId: number }
        >({
            query: ({ type, userId }) => {
                return `action/by-type?userId=${userId}&type=${type}`;
            },
            providesTags: ["Action"],
        }),

        deleteAction: builder.mutation<
            { success: boolean; id: number },
            number
        >({
            query: (actionId) => ({
                url: `action/${actionId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Action", id: arg },
            ],
        }),
    }),
});

export const {
    useCreateGameMutation,
    useGetGameQuery,
    useLazyGetGameQuery,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useCreatePairMutation,
    // useCreateOrUpdateActionsMutation,
    useCreateActionsMutation,
    useUpdateActionsMutation,
    useGetActionsByTypeQuery,
    useLazyGetActionsByTypeQuery,
    useGetActionsByUserQuery,
    useLazyGetActionsByUserQuery,
    useDeleteActionMutation,
} = gameApi;
