import { ChangeEvent, FC } from "react";
import styles from "./InputsListEstimates.module.scss";
import classNames from "classnames";
import { Action } from "@/entities/action";
import { Button } from "@/shared/components/Button/Button";
import { ListItem } from "../ListItem/ListItem";

interface InputsListEstimatesProps {
    isPartnerPrToPlPage: boolean;
    actions: Action[];
    isSomeFieldsEmpty: boolean;
    isReadyBtnDisabled: boolean;
    placeholder: string;
    onInputChange: (
        e: ChangeEvent<HTMLInputElement>,
        action: Action,
        i: number
    ) => void;
    onReadyClick: () => Promise<void>;
    className?: string;
    isError?: boolean;
    isSaveSuccess: boolean;
}

export const InputsListEstimates: FC<InputsListEstimatesProps> = (props) => {
    const {
        isPartnerPrToPlPage,
        actions,
        isSomeFieldsEmpty,
        isReadyBtnDisabled,
        placeholder,
        onInputChange,
        onReadyClick,
        className,
        isError,
        isSaveSuccess,
    } = props;

    const list = actions.map((action, i) => {
        return (
            <ListItem
                isPartnerPrToPlPage={isPartnerPrToPlPage}
                key={action.actionId}
                action={action}
                isSomeFieldsEmpty={isSomeFieldsEmpty}
                placeholder={placeholder}
                onInputChange={(e) => onInputChange(e, action, i)}
                index={i}
            />
        );
    });

    return (
        <>
            <ul
                className={classNames(
                    styles.list,
                    className && styles[className]
                )}
            >
                {list}
            </ul>

            <div className={styles.btnWrapper}>
                <Button
                    onClick={onReadyClick}
                    disabled={isReadyBtnDisabled}
                    type="button"
                >
                    Готово
                </Button>
            </div>

            {isSaveSuccess && (
                <div className={styles.success}>Данные успешно сохранены</div>
            )}

            {isError && <div>Произошла ошибка</div>}
        </>
    );
};
