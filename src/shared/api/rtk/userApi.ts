import {
    CreateUserRequest,
    UpdateResourcesRequest,
    User,
} from "@/shared/interfaces/game";
import { emptyGameApi } from "./emptyGameApi";

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
} = userApi;
