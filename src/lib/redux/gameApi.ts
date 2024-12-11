import {
    Action,
    CreateActionsRequest,
    CreateExpectationRequest,
    CreateUserRequest,
    Expectation,
    Game,
    UpdateResourcesRequest,
    User,
} from "@/shared/interfaces/game";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiUrl = "http://localhost:3001/api/";

export const gameApi = createApi({
    reducerPath: "gameApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["User", "Action", "Expectation"],
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
            providesTags: ["User"],
        }),

        // user
        createPair: builder.mutation<User[], CreateUserRequest[]>({
            query: (user) => ({
                url: "user/pair",
                method: "POST",
                body: user,
            }),
        }),

        updateUserResources: builder.mutation<User, UpdateResourcesRequest>({
            query: (updateResourcesBody) => ({
                url: `user/resources`,
                method: "PATCH",
                body: updateResourcesBody,
            }),
            invalidatesTags: ["User"],
        }),

        getUsers: builder.query<User[], number>({
            query: (hash) => `user/${hash}`,
            providesTags: ["User"],
        }),

        // action

        createActions: builder.mutation<Action, CreateActionsRequest>({
            query: (actions) => ({
                url: "action",
                method: "POST",
                body: actions,
            }),
            invalidatesTags: ["Action"],
        }),

        updateActions: builder.mutation<Action[], Action[]>({
            query: (actions) => ({
                url: "action",
                method: "PATCH",
                body: actions,
            }),
            invalidatesTags: ["Action"],
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
            invalidatesTags: ["Action"],
        }),

        // expectation

        createExpectations: builder.mutation<
            Expectation,
            CreateExpectationRequest
        >({
            query: (expectations) => ({
                url: "expectation",
                method: "POST",
                body: expectations,
            }),
            invalidatesTags: ["Expectation"],
        }),

        getExpectations: builder.query<Expectation[], number>({
            query: (userId) => ({
                url: `expectation?userId=${userId}`,
            }),
            providesTags: ["Expectation"],
        }),

        updateExpectations: builder.mutation<Expectation[], Expectation[]>({
            query: (expectations) => ({
                url: "expectation",
                method: "PATCH",
                body: expectations,
            }),
            invalidatesTags: ["Expectation"],
        }),

        deleteExpectation: builder.mutation<
            { success: boolean; id: number },
            number
        >({
            query: (expectationId) => ({
                url: `expectation/${expectationId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Expectation"],
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
    useUpdateUserResourcesMutation,
    // useCreateOrUpdateActionsMutation,
    useCreateActionsMutation,
    useUpdateActionsMutation,
    useGetActionsByTypeQuery,
    useLazyGetActionsByTypeQuery,
    useGetActionsByUserQuery,
    useLazyGetActionsByUserQuery,
    useDeleteActionMutation,
    useCreateExpectationsMutation,
    useGetExpectationsQuery,
    useUpdateExpectationsMutation,
    useDeleteExpectationMutation,
} = gameApi;
