"use client";

import styles from "./page.module.scss";
import { useParams, useRouter } from "next/navigation";
import { GameDescription } from "@/shared/components/GameDescription/GameDescription";
import { Button } from "@/shared/components/Button/Button";
import { UserPagesNames } from "@/shared/config/UserPagesNames";

export default function Start() {
    const router = useRouter()
    const params = useParams<{ hash: string; user: string }>();

    const handleReject = () => {};
    const handleStart = () => {
        router.push(`/game/${params.hash}/${params.user}/${UserPagesNames.PLAYER_TO_PARTNER}`)
    };

    return (
        <div className="container">
            <GameDescription />
            <div className={styles.btns}>
                <Button
                    className={styles.payBtn}
                    type="button"
                    onClick={handleStart}
                >
                    НАЧАТЬ
                </Button>
                <Button
                    className={styles.payBtn}
                    type="button"
                    onClick={handleReject}
                >
                    ОТКАЗАТЬСЯ
                </Button>
            </div>
        </div>
    );
}
