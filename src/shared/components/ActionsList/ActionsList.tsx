import { FC } from "react";
import styles from "./ActionsList.module.scss";
import { Input, InputTheme } from "../Input/Input";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "../Button/Button";
import { Action } from "@/shared/interfaces/game";

interface ActionsListProps {
    actions: Action[];
    btnToDelete: number | null;
    isSomeFieldsEmpty: boolean;
    isReadyBtnDisabled: boolean;
    placeholder: string;
    firstInputTheme: InputTheme.CLOUD | InputTheme.CLOUD_L;
    onInputChange: (value: string, i: number) => void;
    onRowDelete: (actionId: number) => void;
    onAddClick: () => void;
    onReadyClick: () => Promise<void>;
}

export const ActionsList: FC<ActionsListProps> = (props) => {
    const {
        actions,
        btnToDelete,
        isSomeFieldsEmpty,
        isReadyBtnDisabled,
        placeholder,
        onInputChange,
        onRowDelete,
        onAddClick,
        onReadyClick,
        firstInputTheme
    } = props;

    return (
        <>
            <ul className={styles.list}>
                {actions.map(({ title, actionId }, i) => (
                    <li key={actionId} className={styles.listItem}>
                        <Input
                            theme={
                                i === 0 ? firstInputTheme : InputTheme.ACTION
                            }
                            value={title}
                            placeholder={placeholder}
                            onChange={(e) => onInputChange(e.target.value, i)}
                            isDeleteBtnDisabled={btnToDelete === actionId}
                            onDelete={
                                actions.length > 1
                                    ? () => onRowDelete(actionId)
                                    : undefined
                            }
                        />
                        {isSomeFieldsEmpty && title.length === 0 && (
                            <div className={styles.emptyField}>
                                Поле не должно быть пустым
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={onAddClick} className={styles.addRow}>
                <CrossIcon />
                <span>Добавить ещё строку</span>
            </button>
            <div className={styles.btnWrapper}>
                <Button
                    onClick={onReadyClick}
                    disabled={isReadyBtnDisabled}
                    type="button"
                >
                    Готово
                </Button>
            </div>
        </>
    );
};
