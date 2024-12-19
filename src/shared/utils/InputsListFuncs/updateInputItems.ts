import { Action } from "@/entities/action";
import { Expectation } from "@/entities/expectation";
import { SetStateAction } from "react";

export const updateInputsData = <T extends Action | Expectation>(
    value: string,
    i: number,
    items: T[],
    setClientItems: (value: SetStateAction<T[]>) => void,
    setIsSomeFieldsEmpty: (value: SetStateAction<boolean>) => void
) => {
    const newItems = [...items];
    if (newItems[i]) {
        const newItem = { ...newItems[i] };
        newItem.title = value;
        newItems[i] = newItem;
        setClientItems(newItems);
    }
    const isSomeFieldsEmpty = newItems.some((item) => !item.title);
    if (!isSomeFieldsEmpty) {
        setIsSomeFieldsEmpty(false);
    }
};
