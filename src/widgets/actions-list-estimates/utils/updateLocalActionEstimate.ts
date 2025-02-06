import { Action } from "@/entities/action";
import { SetStateAction } from "react";

export const updateLocalActionEstimate = (
    value: string,
    fieldToChange: keyof Pick<Action, "estimate" | "partnerEstimate">,
    i: number,
    localActions: Action[],
    setLocalActions: (value: SetStateAction<Action[]>) => void,
    setIsSomeFieldsEmpty: (value: SetStateAction<boolean>) => void
) => {
    let correctedValue;
    const trimmedValue = value.replace(/^0+(?!$)/, "");
    const numberValue = parseInt(trimmedValue);

    if (isNaN(numberValue)) {
        correctedValue = "";
    } else if (numberValue > 100) {
        correctedValue = "100";
    } else if (numberValue < 0) {
        correctedValue = "0";
    } else {
        correctedValue = trimmedValue;
    }

    const newItems = [...localActions];
    if (newItems[i]) {
        const newItem = { ...newItems[i] };
        newItem[fieldToChange] = Number(correctedValue);
        newItems[i] = newItem;
        setLocalActions(newItems);
    }
    const isSomeFieldsEmpty = newItems.some(
        (item) => item[fieldToChange] === null
    );

    console.log(isSomeFieldsEmpty, fieldToChange);

    if (!isSomeFieldsEmpty) {
        setIsSomeFieldsEmpty(false);
    }
};