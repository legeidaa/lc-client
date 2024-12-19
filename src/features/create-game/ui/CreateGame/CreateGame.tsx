"use client";
import { useCreateGameMutation } from "@/shared/api";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./CreateGame.module.scss";
import { Button } from "@/shared/components/Button/Button";
import Image from "next/image";
import ArrowImage from "@/img/arrow.svg";

export const CreateGame = () => {
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
        <>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>
                    В любых отношениях важен баланс.
                    <br />А в романтических нарушение баланса ощущается особенно
                    болезненно
                </h2>
                <div className={styles.arrow}>
                    <Image
                        src={ArrowImage.src}
                        alt=""
                        height={32}
                        width={270}
                    />
                </div>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <div className={styles.circle} />
                        <p className={styles.p}>
                            Если вам кажется, что вы вкладываетесь в отношения
                            больше, чем ваш партнер. Если вы ожидаете большего,
                            чем он для вас делает – возникает недовольство,
                            претензии и обиды. А иногда даже и расставания.
                        </p>
                    </li>
                    <li className={styles.listItem}>
                        <div className={styles.circle} />
                        <p className={styles.p}>
                            Чтобы отношения развивались гармонично, тепло и
                            глубоко, важно разговаривать. Уметь слушать и
                            слышать друг друга. Уметь без обиды воспринять
                            предложения и замечания партнера, и уже на основе
                            этого делать для себя выводы о готовности или
                            неготовности это принимать и искать компромиссы.
                        </p>
                    </li>
                    <li className={styles.listItem}>
                        <div className={styles.circle} />
                        <p className={styles.p}>
                            Но чтобы было о чем говорить, нужно собрать материал
                            для беседы. И именно это поможет сделать игра
                            Любовная бухгалтерия – а именно, подбить баланс в
                            ваших отношениях. И даст возможность услышать о
                            желаниях друг друга.
                        </p>
                    </li>
                </ul>
            </div>
            <Button className={styles.payBtn} type="button" onClick={handleCreateGame}>
                ОПЛАТИТЬ
            </Button>
        </>
    );
};
