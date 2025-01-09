import classNames from "classnames";
import styles from "./LoadingSpinner.module.scss";
import { FC } from "react";

interface LoadingSpinnerProps {
    align?: "center" | "top";
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = (props) => {
    const { align = "top" } = props;
    return (
        <div data-testid="loading-spinner" className={classNames(styles.wrapper, styles[align])}>
            <div className={styles.spinner} />
        </div>
    );
};
