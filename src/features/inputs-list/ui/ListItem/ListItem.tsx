import { FC } from "react";
import styles from "./ListItem.module.scss";
import { Input, InputTheme } from "@/shared/components/Input/Input";
import classNames from "classnames";
import { Expectation } from "@/entities/expectation";
import { Action } from "@/entities/action";

interface ListItemProps {
    actionsLength: number;
    index: number;
    actionId: number;
    action: Action | Expectation;
    btnToDelete: number | null;
    isDeleteActionLoading: boolean;
    isSomeFieldsEmpty: boolean;
    placeholder: string;
    firstInputTheme: InputTheme.CLOUD | InputTheme.CLOUD_L;
    onInputChange: (value: string, i: number) => void;
    onRowDelete: (actionId: number) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
    const {
        actionsLength,
        index,
        actionId,
        action,
        btnToDelete,
        isSomeFieldsEmpty,
        placeholder,
        onInputChange,
        onRowDelete,
        firstInputTheme,
        isDeleteActionLoading,
    } = props;

    return (
        <li
            className={classNames(styles.listItem, {
                [styles[firstInputTheme] as string]: index === 0,
            })}
        >
            <Input
                theme={index === 0 ? firstInputTheme : InputTheme.ACTION}
                value={action.title}
                placeholder={placeholder}
                onChange={(e) => onInputChange(e.target.value, index)}
                isDeleteBtnDisabled={
                    isDeleteActionLoading && btnToDelete === actionId
                }
                onDelete={
                    actionsLength > 1 ? () => onRowDelete(actionId) : undefined
                }
            />
            {isSomeFieldsEmpty && action.title.length === 0 && (
                <div className={styles.emptyField}>
                    Поле не должно быть пустым
                </div>
            )}
        </li>
    );
};
