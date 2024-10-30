import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quizDataReducer } from "./quizDataSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

export const rootReducer = combineReducers({
    quiz: quizDataReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    devTools: true,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
