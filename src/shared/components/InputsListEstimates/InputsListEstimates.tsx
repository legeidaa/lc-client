import { ChangeEvent, FC } from "react";
import styles from "./InputsListEstimates.module.scss";
import { Input, InputTheme } from "../Input/Input";
import { Button } from "../Button/Button";
import { Action } from "@/shared/interfaces/game";
import classNames from "classnames";

interface InputsListEstimatesProps {
    actions: Action[];
    isSomeFieldsEmpty: boolean;
    isReadyBtnDisabled: boolean;
    placeholder: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>, i: number) => void;
    onReadyClick: () => Promise<void>;
    className?: string;
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
    } = props;

    return (
        <>
            <ul
                className={classNames(
                    styles.list,
                    className && styles[className]
                )}
            >
                {actions.map((action, i) => {
                    const estimate =
                        action.estimate === null ? "" : action.estimate.toString();

                    return (
                        <li
                            key={action.actionId}
                            className={classNames(styles.listItem)}
                        >
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
                })}
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
        </>
    );
};
