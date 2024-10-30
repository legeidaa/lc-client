import { RootState } from "./store";

export const isComplete = (state: RootState) => state.quiz.isComplete;
export const step = (state: RootState) => state.quiz.step;
export const question = (state: RootState) => state.quiz.question;
export const prosToDo = (state: RootState) => state.quiz.prosToDo;
export const consToDo = (state: RootState) => state.quiz.consToDo;
export const prosNotToDo = (state: RootState) => state.quiz.prosNotToDo;
export const consNotToDo = (state: RootState) => state.quiz.consNotToDo;
