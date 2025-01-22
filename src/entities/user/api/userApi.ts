import { emptyGameApi } from "@/shared/api";
import {
    CreateUserRequest,
    UpdateMessageRequest,
    UpdateResourcesRequest,
    User,
} from "../model/types";

const userApi = emptyGameApi.injectEndpoints({
    endpoints: (builder) => ({
        createPair: builder.mutation<User[], CreateUserRequest[]>({
            query: (user) => ({
                url: "user/pair",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),

        updateUserResources: builder.mutation<User, UpdateResourcesRequest>({
            query: (updateResourcesBody) => ({
                url: `user/resources`,
                method: "PATCH",
                body: updateResourcesBody,
            }),
            invalidatesTags: ["User"],
        }),
        updateUserMessage: builder.mutation<User, UpdateMessageRequest>({
            query: (updateMessageBody) => ({
                url: `user/message`,
                method: "PUT",
                body: updateMessageBody,
            }),
            invalidatesTags: ["User"],
        }),
        getUsers: builder.query<User[], number>({
            query: (hash) => `user/${hash}`,
            providesTags: ["User"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreatePairMutation,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useUpdateUserResourcesMutation,
    useUpdateUserMessageMutation,
} = userApi;
