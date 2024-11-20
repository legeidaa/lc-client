import { FC } from "react";
import styles from "./ActionsList.module.scss";
import { Input } from "../Input/Input";
import { Action } from "@/shared/interfaces/game";
import { CrossIcon } from "../icons/CrossIcon";

interface ActionsListProps {
    actions: Action[];
    onInputChange: (value: string, i: number) => void;
    onRowDelete: (i: number) => void;
    errorText?: string;
    placeholder?: string;
    onAddClick?: () => void;
}

export const ActionsList: FC<ActionsListProps> = ({
    actions,
    onInputChange,
    onRowDelete,
    errorText,
    placeholder,
    onAddClick,
}) => {
    return (
        <>
            <ul className={styles.list}>
                {actions.map(({ title, actionId }) => (
                    <li key={actionId} className={styles.listItem}>
                        <Input
                            inputStyle="action"
                            value={title}
                            placeholder={placeholder}
                            onChange={(e) => onInputChange(e.target.value, actionId)}
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
        </>
    );
};
