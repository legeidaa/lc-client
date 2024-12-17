import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiUrl = "http://localhost:3001/api/";

export const emptyGameApi = createApi({
    reducerPath: "emptyGameApi",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["User", "Action", "Expectation"],
    endpoints: () => ({}),
});
