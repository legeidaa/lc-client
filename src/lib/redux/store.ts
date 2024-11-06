import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameInfoReducer } from "./gameSlice";
import { gameApi } from "./gameApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const rootReducer = combineReducers({
    gameInfo: gameInfoReducer,
    [gameApi.reducerPath]: gameApi.reducer,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(gameApi.middleware),
    });
};
const store = makeStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
