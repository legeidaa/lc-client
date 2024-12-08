import { Action, Expectation } from "@/shared/interfaces/game";
import { SetStateAction } from "react";

export const updateInputsData = <T extends Action | Expectation>(
    value: string,
    i: number,
    items: T[],
    setter: (value: SetStateAction<T[]>) => void,
    setIsSomeFieldsEmpty: (value: SetStateAction<boolean>) => void
) => {
    const newItems = [...items];
    if (newItems[i]) {
        const newItem = { ...newItems[i] };
        newItem.title = value;
        newItems[i] = newItem;
        setter(newItems);
    }
    const isSomeFieldsEmpty = newItems.some((item) => !item.title);
    if (!isSomeFieldsEmpty) {
        setIsSomeFieldsEmpty(false);
    }
};
