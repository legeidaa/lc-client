import "cross-fetch/polyfill";
import "@testing-library/jest-dom";
import { server } from "./server";
import { emptyGameApi } from "@/shared/api/rtk/emptyGameApi";
import { makeStore } from "@/fsd-app/redux/store";

// https://gustavocd.dev/posts/testing-rtk-query-with-msw/
// https://dev.to/ifeanyichima/-testing-components-with-a-request-for-rtk-query-using-msw-and-react-testing-library-5a8n

const store = makeStore();

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
    store.dispatch(emptyGameApi.util.resetApiState());
});

afterAll(() => server.close());
