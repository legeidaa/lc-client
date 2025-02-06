import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./ActionsListEstimatesContoller.module.scss";
import { Action, useUpdateActionsMutation } from "@/entities/action";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useGetActionsListData } from "@/entities/action/methods/useGetActionsListData";
import { InputsListEstimates } from "../InputsListEstimates/InputsListEstimates";
import { updateLocalActionEstimate } from "../../utils/updateLocalActionEstimate";


export const ActionsListEstimatesContoller: FC = () => {
    const { actions, isActionsLoadingSuccess, isPartnerPrToPlPage } =
        useGetActionsListData();

    const [
        updateActions,
        {
            isLoading: isUpdateActionsLoading,
            isError: isUpdateActionsError,
            isSuccess: isUpdateActionsSuccess,
            status: updateActionsStatus,
            reset: updateActionsReset,
        },
    ] = useUpdateActionsMutation();

    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const [localActions, setLocalActions] = useState<Action[]>([]);

    const isSaveSuccess =
        updateActionsStatus === "fulfilled" && isUpdateActionsSuccess;

    // очищение isSaveSuccess
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (isSaveSuccess) {
            timeoutId = setTimeout(() => {
                updateActionsReset();
            }, 3000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isSaveSuccess, updateActionsReset]);

    useEffect(() => {
        if (isActionsLoadingSuccess && actions) {
            setLocalActions(actions);
        }
    }, [actions, isActionsLoadingSuccess]);

    const inputChangeHandler = (
        e: ChangeEvent<HTMLInputElement>,
        action: Action,
        i: number
    ) => {
        const { value } = e.target;

        if (isPartnerPrToPlPage && action.type === "green") {
            updateLocalActionEstimate(
                value,
                "partnerEstimate",
                i,
                localActions,
                setLocalActions,
                setIsSomeFieldsEmpty
            );
        } else {
            updateLocalActionEstimate(
                value,
                "estimate",
                i,
                localActions,
                setLocalActions,
                setIsSomeFieldsEmpty
            );
        }
    };

    const saveData = async () => {
        const isSomeFieldsEmpty = localActions.some((action) => {
            if (isPartnerPrToPlPage && action.type === "green") {
                return action.partnerEstimate === null;
            } else {
                return action.estimate === null;
            }
        });        

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
        <>
            <div className={styles.max}>
                Максимальная стоимость одного действия – 100 любкоинов
            </div>
            <InputsListEstimates
                isPartnerPrToPlPage={isPartnerPrToPlPage}
                actions={localActions}
                isReadyBtnDisabled={isUpdateActionsLoading}
                placeholder="0"
                onInputChange={inputChangeHandler}
                onReadyClick={saveData}
                isSomeFieldsEmpty={isSomeFieldsEmpty}
                isSaveSuccess={isSaveSuccess}
                isError={isUpdateActionsError}
            />
        </>
    );
};
