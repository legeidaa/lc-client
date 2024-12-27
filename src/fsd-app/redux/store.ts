import { emptyGameApi } from "@/shared/api/rtk/emptyGameApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
export const rootReducer = combineReducers({
    [emptyGameApi.reducerPath]: emptyGameApi.reducer,
});

export const makeStore = (preloadedState?: Partial<RootState> ) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(emptyGameApi.middleware),
    });
};
const store = makeStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore["dispatch"];
