import { FC, useState } from "react";
import styles from "./ActionsList.module.scss";
import { Input } from "../Input/Input";
import {
    Action,
    ActionType,
    ClientAction,
    User,
} from "@/shared/interfaces/game";
import { CrossIcon } from "../icons/CrossIcon";
import {
    useCreateOrUpdateActionsMutation,
    useDeleteActionMutation,
} from "@/lib/redux/gameApi";

interface ActionsListProps {
    actions: Action[];
    placeholder?: string;
    actionsType: ActionType;
    user: User;
}

export const ActionsList: FC<ActionsListProps> = ({
    actions,
    placeholder,
    actionsType,
    user,
}) => {
    const [updateActions, { isLoading: isActionsLoading }] =
        useCreateOrUpdateActionsMutation();
    const [deleteAction] = useDeleteActionMutation();
    const [btnToDelete, setBtnToDelete] = useState<number | null>(null);

    const createClientAction = (): ClientAction => {
        return {
            userId: user.userId,
            cost: null,
            title: "",
            type: actionsType,
            actionId: Date.now() + Math.random(),
            // помечаем, что это созданный на клиенте action
            client: true,
        };
    };

    const createInitialActions = (): ClientAction[] => {
        function createClientActions(num: number): ClientAction[] {
            const clientActions: ClientAction[] = new Array(num)
                .fill(null)
                .map(() => {
                    return createClientAction();
                });
            return clientActions;
        }

        const newActions =
            actions.length > 4
                ? actions
                : [...actions, ...createClientActions(4 - actions.length)];

        return newActions;
    };

    const [clientActions, setClientActions] = useState(createInitialActions());
    const [isSomeFieldsEmpty, setIsSomeFieldsEmpty] = useState(false);

    const onInputChange = (value: string, i: number) => {
        const newActions = [...clientActions];
        if (newActions[i]) {
            const newAction = { ...newActions[i] };
            newAction.title = value;
            newActions[i] = newAction;
            setClientActions(newActions);
        }
    };

    const onAddClick = () => {
        setClientActions([...clientActions, createClientAction()]);
    };

    const onRowDelete = async (actionId: number) => {
        const toDelete = clientActions.find(
            (action) => action.actionId === actionId
        );
        const isClient = toDelete?.client;

        if (isClient) {
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

        const actionsToUpdate = clientActions.map((action) => {
            if (action.client) {
                return {
                    cost: action.cost,
                    title: action.title,
                    type: action.type,
                    userId: user.userId,
                } as Action;
            }
            return action;
        });
        const updatedActions = await updateActions(actionsToUpdate).unwrap();
        setClientActions(updatedActions);
        setIsSomeFieldsEmpty(false);
    };

    return (
        <>
            <ul className={styles.list}>
                {clientActions.map(({ title, actionId }, i) => (
                    <li key={actionId} className={styles.listItem}>
                        <Input
                            inputStyle="action"
                            value={title}
                            placeholder={placeholder}
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

            <div onClick={onAddClick} className="choices-list__add">
                <button className="btn btn_round btn_icon">
                    <CrossIcon />
                </button>
                <span>Добавить ещё строку</span>
            </div>

            <button onClick={saveData} disabled={isActionsLoading}>
                Готово
            </button>
        </>
    );
};
