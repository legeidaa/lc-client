import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";

export const enum ButtonTheme {
    WHITE = "white",
    TRANSPARENT = "transparent",
}

export const enum ButtonSize {
    M = "size_m",
    L = "size_l",
}

export const enum ButtonShape {
    ROUND = "round",
    NORMAL = "size_l",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type: "submit" | "reset" | "button";
    className?: string;
    children?: React.ReactNode;
    size?: ButtonSize;
    theme?: ButtonTheme;
    round?: boolean;
    icon?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        type,
        className,
        children,
        theme = ButtonTheme.WHITE,
        size = ButtonSize.M,
        round,
        icon,
        ...otherProps
    } = props;

    const classnames = classNames(
        styles.btn,
        [styles[theme]],
        [styles[size]],
        { [styles.round as string]: round, [styles.icon as string]: icon },
        [className]
    );
    return (
        <button {...otherProps} type={type} className={classnames}>
            {children}
        </button>
    );
};
