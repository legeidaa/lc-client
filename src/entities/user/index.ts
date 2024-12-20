export {
    useCreatePairMutation,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useUpdateUserResourcesMutation,
} from "./api/userApi";

export type {
    Sex,
    Role,
    User,
    CreateUserRequest,
    UpdateResourcesRequest,
} from "./model/types";
