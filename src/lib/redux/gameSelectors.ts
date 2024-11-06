import { useTypedSelector } from "./hooks/useTypedSelector";
import { RootState } from "./store";

export const isComplete = useTypedSelector(
    (state: RootState) => state.quiz.isComplete
);
export const step = useTypedSelector((state: RootState) => state.quiz.step)
