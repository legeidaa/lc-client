import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            Лендинг
            <Link href="/game/payment">Оплата</Link>
        </div>
    );
}
