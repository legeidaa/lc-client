import { stepsList } from "@/app/game/steps-list";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    isComplete: boolean;
    step: number;
}

const initialState: State = {
    isComplete: false,
    step: 0,
};

export const gameInfoSlice = createSlice({
    name: "gameInfo",
    initialState,
    reducers: {
        setIsComplete: (state, action) => {
            state.isComplete = action.payload;
        },
        resetState: () => {
            return initialState;
        },

        setStep: (state, action: PayloadAction<number>) => {
            window.scrollTo(0, 0);
            state.step = action.payload;
        },
        setNextStep: (state) => {
            state.step =
                state.step >= stepsList.length - 1 ? 0 : state.step + 1;
            window.scrollTo(0, 0);
        },
        setPrevStep: (state) => {
            state.step = state.step > 0 ? state.step - 1 : 0;
            window.scrollTo(0, 0);
        },
    },
});

export const gameInfoActions = gameInfoSlice.actions;

export const gameInfoReducer = gameInfoSlice.reducer;
