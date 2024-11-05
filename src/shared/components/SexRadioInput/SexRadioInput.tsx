import { FC, HTMLProps } from "react";
import styles from "./SexRadioInput.module.scss";
import classNames from "classnames";
interface SexRadioInputProps extends HTMLProps<HTMLInputElement> {
    type: "male" | "female";
    id: string;
    name: string;
}

export const SexRadioInput: FC<SexRadioInputProps> = ({
    type,
    id,
    name,
    ...props
}) => {
    return (
        <label className={classNames(styles.label, styles[type])}>
            <input
                type="radio"
                name={name}
                value={type}
                id={id}
                className={styles.input}
                {...props}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};
