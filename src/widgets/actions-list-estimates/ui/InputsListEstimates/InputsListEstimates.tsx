import { ChangeEvent, FC } from "react";
import styles from "./InputsListEstimates.module.scss";
import classNames from "classnames";
import { Action } from "@/entities/action";
import { Input, InputTheme } from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button/Button";

interface InputsListEstimatesProps {
    actions: Action[];
    isSomeFieldsEmpty: boolean;
    isReadyBtnDisabled: boolean;
    placeholder: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
    onReadyClick: () => Promise<void>;
    className?: string;
    isError?: boolean;
    isSaveSuccess: boolean;
}

export const InputsListEstimates: FC<InputsListEstimatesProps> = (props) => {
    const {
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
        const estimate =
            action.estimate === null ? "" : action.estimate.toString();

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
                        onChange={(e) => onInputChange(e, i)}
                    />
                </div>
                {isSomeFieldsEmpty && action.estimate === null && (
                    <div className={styles.emptyField}>
                        Поле не должно быть пустым
                    </div>
                )}
            </li>
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
