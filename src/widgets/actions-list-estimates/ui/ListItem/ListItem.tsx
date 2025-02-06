import { Action } from "@/entities/action";
import { Input, InputTheme } from "@/shared/components/Input/Input";
import classNames from "classnames";
import { ChangeEvent, FC } from "react";
import styles from "./ListItem.module.scss";

interface ListItemProps {
    isPartnerPrToPlPage: boolean;
    action: Action;
    isSomeFieldsEmpty: boolean;
    placeholder: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
    index: number;
}

export const ListItem: FC<ListItemProps> = (props) => {
    const {
        action,
        isSomeFieldsEmpty,
        placeholder,
        onInputChange,
        index,
        isPartnerPrToPlPage,
    } = props;

    
    const estimate =
        isPartnerPrToPlPage && action.type === "green"
            ? action.partnerEstimate
            : action.estimate;

    const value = estimate === null ? "" : estimate.toString();

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
                    value={value}
                    placeholder={placeholder}
                    type="number"
                    min={0}
                    max={100}
                    onChange={(e) => onInputChange(e, index)}
                />
            </div>
            {isSomeFieldsEmpty && estimate === null && (
                <div className={styles.emptyField}>
                    Поле не должно быть пустым
                </div>
            )}
        </li>
    );
};
