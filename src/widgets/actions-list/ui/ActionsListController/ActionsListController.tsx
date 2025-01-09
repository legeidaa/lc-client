import { FC, useEffect, useRef, useState } from "react";
import {
    Action,
    ClientAction,
    useCreateActionsMutation,
    useDeleteActionMutation,
    useUpdateActionsMutation,
} from "@/entities/action";
import { createClientAction } from "@/entities/action/factory/createClientAction";
import { isClientAction } from "@/entities/action/methods/isClientAction";
import { createClientActions } from "@/entities/action/factory/createClientActions";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { InputsList } from "@/features/inputs-list/ui/InputsList";
import { InputTheme } from "@/shared/components/Input/Input";
import { useGetActionsListData } from "@/entities/action/methods/useGetActionsListData";
import {
    deleteInputItem,
    saveInputsListData,
    updateInputsData,
} from "@/features/inputs-list";

export const ActionsListController: FC = () => {
    const {
        actions,
        actionsType,
        currentUser: user,
        isActionsLoadingSuccess,
    } = useGetActionsListData();

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
    const [
        createActions,
        {
            isLoading: isCreateActionsLoading,
            isError: isCreateActionsError,
            isSuccess: isCreateActionsSuccess,
            status: createActionsStatus,
            reset: createActionsReset,
        },
    ] = useCreateActionsMutation();
    const [deleteAction, { isError: isDeleteActionError }] =
        useDeleteActionMutation();

    const [btnToDelete, setBtnToDelete] = useState<number | null>(null);
    const [clientActions, setClientActions] = useState<
        (ClientAction | Action)[]
    >([]);
    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const isInitialized = useRef(false);
    const isUpdated = useRef(false);

    const isSaveSuccess =
        (createActionsStatus === "fulfilled" && isCreateActionsSuccess) ||
        (updateActionsStatus === "fulfilled" && isUpdateActionsSuccess);

    // очищение isSaveSuccess
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (isSaveSuccess) {
            timeoutId = setTimeout(() => {
                createActionsReset();
                updateActionsReset();
            }, 3000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [createActionsReset, isSaveSuccess, updateActionsReset]);

    useEffect(() => {
        if (isActionsLoadingSuccess && actions && !isInitialized.current) {
            // если в базе менее четырех действий, подмешиваем дополнительные с пометкой, что созданы на клиенте
            const newActions =
                actions.length > 4
                    ? actions
                    : [
                          ...actions,
                          ...createClientActions(
                              4 - actions.length,
                              user,
                              actionsType
                          ),
                      ];

            setClientActions(newActions);
            isInitialized.current = true;

        } else if (isActionsLoadingSuccess && actions && isUpdated.current) {
            setClientActions([...actions]);
            isUpdated.current = false;

        } else if (isActionsLoadingSuccess && actions && btnToDelete !== null) {
            setClientActions(
                clientActions.filter((item) => item.actionId !== btnToDelete)
            );
            setBtnToDelete(null);
        }
    }, [
        actions,
        actionsType,
        isActionsLoadingSuccess,
        user,
        btnToDelete,
        setBtnToDelete,
        clientActions,
    ]);

    const onInputChange = (value: string, i: number) => {
        updateInputsData(
            value,
            i,
            clientActions,
            setClientActions,
            setIsSomeFieldsEmpty
        );
    };

    const onAddClick = () => {
        setClientActions([
            ...clientActions,
            createClientAction(user, actionsType),
        ]);
    };

    const onRowDelete = async (actionId: number) => {
        deleteInputItem(
            actionId,
            clientActions,
            isClientAction,
            setBtnToDelete,
            deleteAction
        );
    };

    const saveData = async () => {
        await saveInputsListData(
            clientActions,
            isClientAction,
            createActions,
            updateActions,
            setIsSomeFieldsEmpty,
            user,
            isUpdated
        );
    };

    if (!isActionsLoadingSuccess) {
        return <LoadingSpinner />;
    }

    return (
        <InputsList
            actions={clientActions}
            btnToDelete={btnToDelete}
            isReadyBtnDisabled={
                isCreateActionsLoading || isUpdateActionsLoading
            }
            placeholder="Что вы делаете"
            firstInputTheme={InputTheme.CLOUD}
            onInputChange={onInputChange}
            onRowDelete={onRowDelete}
            onAddClick={onAddClick}
            onReadyClick={saveData}
            isSaveSuccess={isSaveSuccess}
            isSomeFieldsEmpty={isSomeFieldsEmpty}
            isError={
                isUpdateActionsError ||
                isCreateActionsError ||
                isDeleteActionError
            }
        />
    );
};
