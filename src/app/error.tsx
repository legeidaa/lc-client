"use client";

import { Button } from "@/shared/components/Button/Button";
import { useEffect } from "react";
import styles from "./error.module.scss";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <h1>Что-то пошло не так</h1>
                <div className={styles.btns}>
                    <Button type="button" onClick={() => reset()}>
                        Попробовать снова
                    </Button>
                </div>
            </div>
        </div>
    );
}
