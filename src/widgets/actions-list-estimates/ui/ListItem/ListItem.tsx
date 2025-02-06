import { Action } from "@/entities/action";
import { Input, InputTheme } from "@/shared/components/Input/Input";
import classNames from "classnames";
import { ChangeEvent, FC } from "react";
import styles from "./ListItem.module.scss";

interface ListItemProps {
    action: Action;
    isSomeFieldsEmpty: boolean;
    placeholder: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
    index: number;
}

export const ListItem: FC<ListItemProps> = (props) => {
    const { action, isSomeFieldsEmpty, placeholder, onInputChange, index } =
        props;

    const estimate = action.estimate === null ? "" : action.estimate.toString();

    return (
        <li key={action.actionId} className={classNames(styles.listItem)}>
            <div className={styles.inputsWrapper}>
                <Input
                    theme={InputTheme.ACTION_WHITE}
                    className={styles.inputTitle}
                    value={action.title}
                    readOnly
                    type="text"
                    tabIndex={-1}
                />
                <Input
                    theme={InputTheme.ESTIMATE}
                    className={styles.inputEstimate}
                    value={estimate}
                    placeholder={placeholder}
                    type="number"
                    min={0}
                    max={100}
                    onChange={(e) => onInputChange(e, index)}
                />
            </div>
            {isSomeFieldsEmpty && action.estimate === null && (
                <div className={styles.emptyField}>
                    Поле не должно быть пустым
                </div>
            )}
        </li>
    );
};
