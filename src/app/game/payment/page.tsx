'use client'

import styles from "./page.module.scss";
import { useCreateGameMutation } from "@/entities/game";
import { Button } from "@/shared/components/Button/Button";
import { GameDescription } from "@/shared/components/GameDescription/GameDescription";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Payment() {
    const [createGameMutation] = useCreateGameMutation();
    const [isCreateGameLoading, setIsCreateGameLoading] =
        useState<boolean>(false);
    const router = useRouter();

    const handleCreateGame = async () => {
        // здесь сперва оплата, потом создание игры при успехе
        setIsCreateGameLoading(true);
        const game = await createGameMutation();
        if (game.data) {
            router.push(`/game/${game.data.gameHash}/start`);
        }
    };

    if (isCreateGameLoading) {
        return <LoadingSpinner align="center" />;
    }
    return (
        <div className="container">
            <GameDescription />
            <Button
                className={styles.payBtn}
                type="button"
                onClick={handleCreateGame}
            >
                ОПЛАТИТЬ
            </Button>
        </div>
    );
}
