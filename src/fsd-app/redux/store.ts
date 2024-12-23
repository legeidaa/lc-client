import { emptyGameApi } from "@/shared/api/rtk/emptyGameApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const rootReducer = combineReducers({
    [emptyGameApi.reducerPath]: emptyGameApi.reducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(emptyGameApi.middleware),
    });
};
const store = makeStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
