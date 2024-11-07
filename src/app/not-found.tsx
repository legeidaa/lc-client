import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
    return (
        <div className={styles.wrapper}>
            <h1>Страница не найдена</h1>
            <Link href="/">На главную</Link>
        </div>
    );
}
