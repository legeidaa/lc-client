import { FC, useEffect, useRef, useState } from "react";
import { Action, ClientAction } from "@/shared/interfaces/game";
import {
    useCreateActionsMutation,
    useDeleteActionMutation,
    useUpdateActionsMutation,
} from "@/lib/redux/gameApi";
import { createClientAction } from "@/shared/utils/createClientAction";
import { isClientAction } from "@/shared/utils/isClientAction";
import { useGetActionsListData } from "@/shared/hooks/useGetActionsListData";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { InputsList } from "../InputsList/InputsList";
import { InputTheme } from "../Input/Input";
import { updateInputsData } from "@/shared/utils/InputsListFuncs/updateInputItems";
import { saveInputsListData } from "@/shared/utils/InputsListFuncs/saveInputsListData";
import { deleteInputItem } from "@/shared/utils/InputsListFuncs/deleteInputItem";

export const ActionsListController: FC = () => {
    const { actions, actionsType, currentUser: user, isActionsLoadingSuccess } =
        useGetActionsListData();

    const [updateActions, { isLoading: isUpdateActionsLoading }] =
        useUpdateActionsMutation();
    const [createActions, { isLoading: isCreateActionsLoading }] =
        useCreateActionsMutation();
    const [deleteAction] = useDeleteActionMutation();

    const [btnToDelete, setBtnToDelete] = useState<number | null>(null);
    const [clientActions, setClientActions] = useState<Array<Action>>([]);
    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const isInitialized = useRef(false);

    useEffect(() => {
        function createClientActions(num: number): ClientAction[] {
            const clientActions: ClientAction[] = new Array(num)
                .fill(null)
                .map(() => {
                    return createClientAction(user, actionsType);
                });
            return clientActions;
        }

        // если в базе менее четырех действий, подмешиваем дополнительные с пометкой, что созданы на клиенте
        if (isActionsLoadingSuccess && actions && !isInitialized.current) {
            const newActions =
                actions.length > 4
                    ? actions
                    : [...actions, ...createClientActions(4 - actions.length)];

            setClientActions(newActions);
            isInitialized.current = true;
        } else if (isActionsLoadingSuccess && actions) {
            if (actions.length === 0) {
                setClientActions([...createClientActions(4)]);
            } else {
            setClientActions([...actions]);
            }
        }
    }, [actions, actionsType, isActionsLoadingSuccess, user]);
    console.log(actions, clientActions);

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
            setClientActions,
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
            user
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
        />
    );
};
