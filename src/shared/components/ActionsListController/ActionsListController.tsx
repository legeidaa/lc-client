import { FC, useEffect, useRef, useState } from "react";
import { Action, ClientAction } from "@/shared/interfaces/game";
import {
    useCreateActionsMutation,
    useDeleteActionMutation,
    useUpdateActionsMutation,
} from "@/shared/api";
import { createClientAction } from "@/shared/utils/createClientAction";
import { isClientAction } from "@/shared/utils/isClientAction";
import { useGetActionsListData } from "@/shared/hooks/useGetActionsListData";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { InputsList } from "../InputsList/InputsList";
import { InputTheme } from "../Input/Input";
import { updateInputsData } from "@/shared/utils/InputsListFuncs/updateInputItems";
import { saveInputsListData } from "@/shared/utils/InputsListFuncs/saveInputsListData";
import { deleteInputItem } from "@/shared/utils/InputsListFuncs/deleteInputItem";
import { createClientActions } from "@/shared/utils/createClientActions";

export const ActionsListController: FC = () => {
    const {
        actions,
        actionsType,
        currentUser: user,
        isActionsLoadingSuccess,
    } = useGetActionsListData();

    const [
        updateActions,
        { isLoading: isUpdateActionsLoading, isError: isUpdateActionsError },
    ] = useUpdateActionsMutation();
    const [
        createActions,
        { isLoading: isCreateActionsLoading, isError: isCreateActionsError },
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
            isSomeFieldsEmpty={isSomeFieldsEmpty}
            isError={
                isUpdateActionsError ||
                isCreateActionsError ||
                isDeleteActionError
            }
        />
    );
};
