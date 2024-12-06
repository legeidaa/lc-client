import styles from "./LoadingSpinner.module.scss";

export const LoadingSpinner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner} />
        </div>
    );
};
