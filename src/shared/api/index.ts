export {
    useCreateGameMutation,
    useGetGameQuery,
    useLazyGetGameQuery,
} from "./rtk/gameApi";

export {
    useCreatePairMutation,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useUpdateUserResourcesMutation,
} from "./rtk/userApi";

export {
    useCreateActionsMutation,
    useDeleteActionMutation,
    useGetActionsByTypeQuery,
    useGetActionsByUserQuery,
    useLazyGetActionsByTypeQuery,
    useLazyGetActionsByUserQuery,
    useUpdateActionsMutation,
} from "./rtk/actionApi";

export {
    useCreateExpectationsMutation,
    useDeleteExpectationMutation,
    useGetExpectationsQuery,
    useLazyGetExpectationsQuery,
    useUpdateExpectationsMutation,
} from "./rtk/expectationApi";
