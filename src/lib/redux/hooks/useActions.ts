import { bindActionCreators } from "@reduxjs/toolkit";
import { gameInfoActions } from "../gameSlice";
import { useAppDispatch } from "../hooks";

const actions = {
    ...gameInfoActions,
};

export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(actions, dispatch);
};
