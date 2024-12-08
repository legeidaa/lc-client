import { FC, useEffect, useRef, useState } from "react";
import {
    Action,
    ClientAction,
} from "@/shared/interfaces/game";
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

export const ActionsListController: FC = () => {
    const { actions, actionsType, user, isActionsLoadingSuccess } =
        useGetActionsListData();

    const [updateActions, { isLoading: isUpdateActionsLoading }] =
        useUpdateActionsMutation();
    const [createActions, { isLoading: isCreateActionsLoading }] =
        useCreateActionsMutation();
    const [deleteAction] = useDeleteActionMutation();

    const [btnToDelete, setBtnToDelete] = useState<number | null>(null);
    const [clientActions, setClientActions] = useState<Array<Action>>([]);
    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // если в базе менее четырех действий, подмешиваем дополнительные с пометкой, что созданы на клиенте
        if (isActionsLoadingSuccess && actions && isFirstRender.current) {
            function createClientActions(num: number): ClientAction[] {
                const clientActions: ClientAction[] = new Array(num)
                    .fill(null)
                    .map(() => {
                        return createClientAction(user, actionsType);
                    });
                return clientActions;
            }

            const newActions =
                actions.length > 4
                    ? actions
                    : [...actions, ...createClientActions(4 - actions.length)];
            isFirstRender.current = false;
            setClientActions(newActions);
            // }
        } else if (isActionsLoadingSuccess && actions) {
            setClientActions([...actions]);
        }
    }, [actions, actionsType, isActionsLoadingSuccess, user]);

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
        const toDelete = clientActions.find(
            (action) => action.actionId === actionId
        );

        if (!toDelete) throw new Error("Action not found");

        if (isClientAction(toDelete)) {
            setClientActions(
                clientActions.filter((action) => action.actionId !== actionId)
            );
        } else {
            setBtnToDelete(actionId);
            const deleted = await deleteAction(actionId).unwrap();
            if (deleted.success) {
                setBtnToDelete(null);
                setClientActions(
                    clientActions.filter(
                        (action) => action.actionId !== actionId
                    )
                );
            }
        }
    };

    const saveData = async () => {
        saveInputsListData(
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
