import "cross-fetch/polyfill";
import "@testing-library/jest-dom";
import { server } from "./server";
import { emptyGameApi } from "@/shared/api/rtk/emptyGameApi";
import { makeStore } from "@/fsd-app/redux/store";

// https://gustavocd.dev/posts/testing-rtk-query-with-msw/
// https://dev.to/ifeanyichima/-testing-components-with-a-request-for-rtk-query-using-msw-and-react-testing-library-5a8n

const store = makeStore();

// Establish API mocking before all tests.
beforeAll(() => {
    server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    server.resetHandlers();
    // This is the solution to clear RTK Query cache after each test
    store.dispatch(emptyGameApi.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
