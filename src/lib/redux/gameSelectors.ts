import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const isCompleteSelector = createSelector(
    [(state: RootState) => state],
    (state) => {
        return state.gameInfo.isComplete;
    }
);

export const stepSelector = createSelector(
    [(state: RootState) => state],
    (state) => {
        return state.gameInfo.step;
    }
);