import styles from "./PageDescription.module.scss";
import classNames from "classnames";

interface PageDescriptionProps {
    textAlign?: "left" | "center" | "right";
    children: React.ReactNode;
}
export const PageDescription = ({ textAlign, children }: PageDescriptionProps) => {
    return (
        <div
            className={classNames(
                styles.pageDescription,
                styles["pageDescription_" + textAlign]
            )}
        >
            {children}
        </div>
    );
};
