"use client";

import { ChangeEvent, FC } from "react";
import styles from "./Input.module.scss";
import classnames from "classnames";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button, ButtonTheme } from "../Button/Button";

export const enum InputTheme {
    SMALL = "small",
    ACTION = "action",
    ACTION_WHITE = "actionWhite",
    ESTIMATE = "estimate",
    CLOUD = "cloud",
    CLOUD_L = "cloudL",
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    label?: string;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onDelete?: () => void;
    errorText?: string;
    theme: InputTheme;
    isDeleteBtnDisabled?: boolean;
}

export const Input: FC<InputProps> = (props) => {
    const {
        label,
        className,
        onChange,
        onDelete,
        errorText,
        theme,
        isDeleteBtnDisabled,
        ...otherProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };
    
    return (
        <div
            className={classnames(
                styles.input,
                styles[theme],
                className
            )}
        >
            <label className={styles.labelWrapper}>
                {label && <span className={styles.label}>{label}</span>}

                <input
                    className={classnames(
                        styles.inputElement,
                        { [styles.delete as string]: onDelete }
                    )}
                    onChange={onChangeHandler}
                    {...otherProps}
                />
            </label>
            {errorText && (
                <div className={classnames(styles.error)}>{errorText}</div>
            )}
            {onDelete && (
                <Button
                    disabled={isDeleteBtnDisabled}
                    className={styles.deleteBtn}
                    type={"button"}
                    icon
                    round
                    theme={ButtonTheme.TRANSPARENT}
                    onClick={onDelete}
                    data-testid="input-delete-btn"
                >
                    <CrossIcon />
                </Button>
            )}
        </div>
    );
};
