import { FC, useEffect, useRef, useState } from "react";
import styles from "./ActionsList.module.scss";
import { Input, InputTheme } from "../Input/Input";
import {
    Action,
    ClientAction,
    CreateActionsRequest,
} from "@/shared/interfaces/game";
import { CrossIcon } from "../icons/CrossIcon";
import {
    useCreateActionsMutation,
    useDeleteActionMutation,
    useUpdateActionsMutation,
} from "@/lib/redux/gameApi";
import { createClientAction } from "@/shared/utils/createClientAction";
import { isClientAction } from "@/shared/utils/isClientAction";
import { useGetActionsListData } from "@/shared/hooks/useGetActionsListData";
import { Button } from "../Button/Button";

export const ActionsList: FC = () => {
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
        const newActions = [...clientActions];
        if (newActions[i]) {
            const newAction = { ...newActions[i] };
            newAction.title = value;
            newActions[i] = newAction;
            setClientActions(newActions);
        }
        const isSomeFieldsEmpty = newActions.some((action) => !action.title);
        if (!isSomeFieldsEmpty) {
            setIsSomeFieldsEmpty(false);
        }
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
        const isSomeFieldsEmpty = clientActions.some((action) => !action.title);
        if (isSomeFieldsEmpty) {
            setIsSomeFieldsEmpty(true);
            return;
        }
        const actionsToUpdate: Action[] = [];
        const actionsToCreate: CreateActionsRequest = [];

        clientActions.forEach((action) => {
            if (isClientAction(action)) {
                actionsToCreate.push({
                    title: action.title,
                    type: action.type,
                    userId: user.userId,
                });
            } else {
                actionsToUpdate.push(action);
            }
        });
        console.log(actionsToUpdate, actionsToCreate);

        const actionsQuery = [];
        if (actionsToCreate.length > 0) {
            actionsQuery.push(createActions(actionsToCreate));
        }
        if (actionsToUpdate.length > 0) {
            actionsQuery.push(updateActions(actionsToUpdate));
        }

        Promise.all(actionsQuery);
    };
    console.log(clientActions, actions);

    // TODO заменить на компонент Loading
    if (!isActionsLoadingSuccess) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ul className={styles.list}>
                {clientActions.map(({ title, actionId }, i) => (
                    <li key={actionId} className={styles.listItem}>
                        <Input
                            theme={i === 0 ? InputTheme.CLOUD : InputTheme.ACTION}
                            value={title}
                            placeholder={"Что вы делаете"}
                            onChange={(e) => onInputChange(e.target.value, i)}
                            isDeleteBtnDisabled={btnToDelete === actionId}
                            onDelete={
                                clientActions.length > 1
                                    ? () => onRowDelete(actionId)
                                    : undefined
                            }
                        />
                        {isSomeFieldsEmpty && title.length === 0 && (
                            <div>Поле не должно быть пустым</div>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={onAddClick} className={styles.addRow}>
                {/* <Button round icon theme={ButtonTheme.TRANSPARENT} type="button" className={styles.addRowBtn}> */}
                <CrossIcon />
                {/* </Button> */}
                <span>Добавить ещё строку</span>
            </button>
            <div className={styles.btnWrapper}>
                <Button
                    onClick={saveData}
                    disabled={isCreateActionsLoading || isUpdateActionsLoading}
                    type="button"
                >
                    Готово
                </Button>
            </div>
        </>
    );
};
