"use client";

import { ChangeEvent, FC } from "react";
import styles from "./Textarea.module.scss";
import classnames from "classnames";

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
    label?: string;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    errorText?: string;
    placeholder?: string;
}

export const Textarea: FC<TextareaProps> = (props) => {
    const {
        label,
        className,
        onChange,
        errorText,
        placeholder,
        ...otherProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
    };

    return (
        <div className={classnames(styles.textarea, className)}>
            <label className={styles.labelWrapper}>
                {label && <span className={styles.label}>{label}</span>}
                <textarea
                    placeholder={placeholder}
                    className={classnames(styles.textareaElement)}
                    onChange={onChangeHandler}
                    {...otherProps}
                />
            </label>
            {errorText && (
                <div className={classnames(styles.error)}>{errorText}</div>
            )}
        </div>
    );
};
