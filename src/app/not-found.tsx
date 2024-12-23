"use client";

import styles from "./not-found.module.scss";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button/Button";

export default function NotFound() {
    const router = useRouter();
    const handleToMainClick = () => {
        router.push("/");
    };
    const handleBackClick = () => {
        router.back();
    };
    return (
        <div className="container">
            <div className={styles.wrapper}>
                <h1>Страница не найдена</h1>
                <div className={styles.btns}>
                    <Button type="button" onClick={handleToMainClick}>
                        На главную
                    </Button>
                    <Button type="button" onClick={handleBackClick}>
                        Вернуться назад
                    </Button>
                </div>
            </div>
        </div>
    );
}
