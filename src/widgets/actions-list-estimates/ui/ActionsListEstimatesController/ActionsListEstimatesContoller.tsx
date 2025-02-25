import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./ActionsListEstimatesContoller.module.scss";
import {
    Action,
    useLazyGetActionsByTypeQuery,
    useUpdateActionsMutation,
} from "@/entities/action";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useGetActionsListData } from "@/entities/action/methods/useGetActionsListData";
import { InputsListEstimates } from "../InputsListEstimates/InputsListEstimates";
import { updateLocalActionEstimate } from "../../utils/updateLocalActionEstimate";
import { GetActionsByTypeRequest } from "@/entities/action/model/types";

interface ActionsListEstimatesContollerProps {
    actionsToFetch: GetActionsByTypeRequest[];
}

export const ActionsListEstimatesContoller: FC<
    ActionsListEstimatesContollerProps
> = (props) => {
    const { actionsToFetch } = props;

    // useGetActionsListData(actionsToFetch);

    const [getActions, { data, isUninitialized }] =
        useLazyGetActionsByTypeQuery();

    useEffect(() => {
        let resultInfo = [];
        let resultActions = [];

        if (actionsToFetch && isUninitialized) {
            const promises = actionsToFetch.map((req) => {
                return getActions(req);
            });
            Promise.all(promises)
                .then((res) => {
                    res.forEach((fetchedData) => {
                        resultInfo.push(fetchedData);
                        if (fetchedData.data) {
                            resultActions.push(...fetchedData.data);
                        }
                    });
                })
                .then(() => {
                    console.log(resultActions, resultInfo);
                });
        }
    }, [actionsToFetch, data, isUninitialized, getActions]);

    const actions = [];
    const isActionsLoadingSuccess = false;
    const isPartnerPrToPlPage = true;

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
