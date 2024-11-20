"use client";

import { ChangeEvent, FC } from "react";
import styles from "./Input.module.scss";
import classnames from "classnames";
import { CrossIcon } from "../icons/CrossIcon";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    label?: string;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onDelete?: () => void;
    errorText?: string;
    inputStyle: "small" | "action" | "actionWhite" | "cost";
}

export const Input: FC<InputProps> = (props) => {
    const {
        label,
        className,
        onChange,
        onDelete,
        errorText,
        inputStyle,
        ...otherProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };

    return (
        <div
            className={classnames(
                styles.input,
                className?.split(" ").map((c) => styles[c])
            )}
        >
            <label className={styles.labelWrapper}>
                {label && <span className={styles.label}>{label}</span>}

                <input
                    className={classnames(
                        styles.inputElement,
                        styles["inputElement_" + inputStyle],
                        { inputElementDelete: onDelete }
                    )}
                    onChange={onChangeHandler}
                    {...otherProps}
                />
            </label>
            {errorText && (
                <div className={classnames(styles.error)}>{errorText}</div>
            )}
            {onDelete && (
                <button
                    className={classnames(
                        "btn btn_round btn_icon",
                        styles.deleteBtn
                    )}
                    onClick={onDelete}
                >
                    <CrossIcon />
                </button>
            )}
        </div>
    );
};
