
import { emptyGameApi } from "@/shared/api";
import { Action, CreateActionsRequest, GetActionsByTypeRequest } from "../model/types";

const actionApi = emptyGameApi.injectEndpoints({
    endpoints: (builder) => ({
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
            GetActionsByTypeRequest
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
    }),
    overrideExisting: false,
});

export const {
    useCreateActionsMutation,
    useDeleteActionMutation,
    useGetActionsByTypeQuery,
    useGetActionsByUserQuery,
    useLazyGetActionsByTypeQuery,
    useLazyGetActionsByUserQuery,
    useUpdateActionsMutation,
} = actionApi;
