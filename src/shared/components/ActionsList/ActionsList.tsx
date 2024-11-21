import { FC, useState } from "react";
import styles from "./ActionsList.module.scss";
import { Input } from "../Input/Input";
import { ActionType, InitialAction, User } from "@/shared/interfaces/game";
import { CrossIcon } from "../icons/CrossIcon";
import { useCreateOrUpdateActionsMutation } from "@/lib/redux/gameApi";

interface ActionsListProps {
    actions: InitialAction[];
    errorText?: string;
    placeholder?: string;
    actionsType: ActionType;
    user: User
}

export const ActionsList: FC<ActionsListProps> = ({
    actions,
    errorText,
    placeholder,
    actionsType,
    user
}) => {
    const [updateActions , {isLoading: isActionsLoading}] = useCreateOrUpdateActionsMutation();
    const [localActions, setLocalActions] = useState(actions);

    const onInputChange = (value: string, i: number) => {
        const newActions = [...localActions];
        if (newActions[i]) {
            console.log(newActions[i]);
            const newAction = {...newActions[i]}
            newAction.title = value;
            newActions[i] = newAction
            setLocalActions(newActions);
        }
    };

    const onAddClick = () => {
        setLocalActions([
            ...localActions,
            {
                actionId: Date.now() + Math.random(),
                cost: null,
                title: "",
                type: actionsType,
                userId: user.userId,
                initial: true
            },
        ]);
    };    

    const onRowDelete = (actionId: number) => {
        const toDelete = localActions.find((action) => action.actionId === actionId)
        const isLocal = toDelete?.initial
        if (isLocal) {
            setLocalActions(localActions.filter((action) => action.actionId !== actionId))
        } else {
            // TODO удаляем на сервере
        }
    }

    const saveData = () => {
        const actionsToUpdate = localActions.map(action => {
            if (action.initial) {
                return {
                    cost: action.cost,
                    title: action.title,
                    type: action.type,
                    userId: user.userId
                }
            }
            return action
        })
        console.log(actionsToUpdate);
        
        updateActions(actionsToUpdate)
    }

    return (
        <>
            <ul className={styles.list}>
                {localActions.map(({ title, actionId }, i) => (
                    <li key={actionId} className={styles.listItem}>
                        <Input
                            inputStyle="action"
                            value={title}
                            placeholder={placeholder}
                            onChange={(e) => onInputChange(e.target.value, i)}
                            onDelete={
                                actions.length > 1
                                    ? () => onRowDelete(actionId)
                                    : undefined
                            }
                        />
                    </li>
                ))}
            </ul>

            {errorText && <div className="error-text">{errorText}</div>}

            <div onClick={onAddClick} className="choices-list__add">
                <button className="btn btn_round btn_icon">
                    <CrossIcon />
                </button>
                <span>Добавить ещё строку</span>
            </div>

            <button onClick={saveData} disabled={isActionsLoading}>Готово</button>
        </>
    );
};
