import {
    CreateExpectationRequest,
    Expectation,
} from "@/shared/interfaces/game";
import { emptyGameApi } from "./emptyGameApi";

const expectationApi = emptyGameApi.injectEndpoints({
    endpoints: (builder) => ({
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
    overrideExisting: false,
});

export const {
    useCreateExpectationsMutation,
    useDeleteExpectationMutation,
    useGetExpectationsQuery,
    useLazyGetExpectationsQuery,
    useUpdateExpectationsMutation,
} = expectationApi;
