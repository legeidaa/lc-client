import { ChangeEvent, FC, useEffect, useState } from "react";
import { useUpdateActionsMutation } from "@/lib/redux/gameApi";
import { useGetActionsListData } from "@/shared/hooks/useGetActionsListData";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { InputsListEstimates } from "../InputsListEstimates/InputsListEstimates";
import { Action } from "@/shared/interfaces/game";

export const ActionsListEstimatesContoller: FC = () => {
    const { actions, isActionsLoadingSuccess } = useGetActionsListData();

    const [updateActions, { isLoading: isUpdateActionsLoading }] =
        useUpdateActionsMutation();

    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const [localActions, setLoacalActions] = useState<Action[]>([]);

    useEffect(() => {
        if (isActionsLoadingSuccess && actions) {
            setLoacalActions(actions);
        }
    }, [actions, isActionsLoadingSuccess]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        const { value } = e.target;

        let correctedValue;
        const trimmedValue = value.replace(/^0+(?!$)/, "");
        const numberValue = parseInt(trimmedValue);

        if (isNaN(numberValue)) {            
            correctedValue = ''; 
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
            newItem.estimate = Number(correctedValue);
            newItems[i] = newItem;            
            setLoacalActions(newItems);
        }
        const isSomeFieldsEmpty = newItems.some((item) => item.estimate === null);
        if (!isSomeFieldsEmpty) {
            setIsSomeFieldsEmpty(false);
        }
    };

    const saveData = async () => {

        
        const isSomeFieldsEmpty = localActions.some((item) => item.estimate === null);

        console.log(localActions, isSomeFieldsEmpty);
        if (isSomeFieldsEmpty) {
            setIsSomeFieldsEmpty(true);
            return;
        }
        updateActions(localActions);
    };

    if (!isActionsLoadingSuccess || !actions) {
        return <LoadingSpinner />;
    }

    return (
        <InputsListEstimates
            actions={localActions}
            isReadyBtnDisabled={isUpdateActionsLoading}
            placeholder="0"
            onInputChange={onInputChange}
            onReadyClick={saveData}
            isSomeFieldsEmpty={isSomeFieldsEmpty}
        />
    );
};
