import { apiUrl } from "@/shared/config/consts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptyGameApi = createApi({
    reducerPath: "emptyGameApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["Game","User", "Action", "Expectation"],
    endpoints: () => ({}),
});
