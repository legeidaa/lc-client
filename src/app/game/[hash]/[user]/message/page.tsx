"use client";

import { HeartIcon } from "@/shared/components/Icons/HeartIcon";
import styles from "./page.module.scss";
import { Textarea } from "@/shared/components/Textarea/Textarea";
import { Button, ButtonTheme } from "@/shared/components/Button/Button";
import { useParams, useRouter } from "next/navigation";
import { useGetGameQuery } from "@/entities/game";
import { Role, User } from "@/entities/user";
import { useUpdateUserMessageMutation } from "@/entities/user/api/userApi";
import { ChangeEvent, useEffect, useState } from "react";

export default function Message() {
    const params = useParams<{ hash: string; user: Role }>();
    const router = useRouter();

    const { data: game } = useGetGameQuery(params.hash);
    const user: User | undefined = game?.users.find(
        (u) => u.role === params.user
    );
    const [updateMessage, { isLoading: isUpdateMessageLoading }] =
        useUpdateUserMessageMutation();

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setMessage(user.message);
        }
    }, [user]);

    const goToNextPage = () => {
        router.push(`/game/${game?.gameHash}/change-player}`);
    };

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleUpdateMessage = async () => {
        if (message.length === 0) return;
        if (!user) throw new Error("Пользователь не найден");

        await updateMessage({
            message,
            userId: user.userId,
        });
        goToNextPage();
    };

    return (
        <div className="container">
            <div className={styles.descr}>
                <div className={styles.descrIcon}>
                    <HeartIcon />
                </div>
                <div className={styles.descrText}>
                    <h3>
                        А здесь вы можете написать послание своего партнеру.
                        Скажите несколько слов о любви, о том, как он для вас
                        важен.
                    </h3>
                    <p>Вы можете пропустить этот этап</p>
                </div>
            </div>
            <div className={styles.message}>
                <Textarea
                    placeholder="Сообщение"
                    className={styles.textarea}
                    value={message}
                    onChange={handleTextareaChange}
                />
                <div className={styles.messageBtns}>
                    <Button
                        type="button"
                        theme={ButtonTheme.WHITE}
                        onClick={handleUpdateMessage}
                        disabled={isUpdateMessageLoading}
                    >
                        Готово
                    </Button>
                    <Button
                        type="button"
                        theme={ButtonTheme.TRANSPARENT}
                        disabled={isUpdateMessageLoading}
                        onClick={goToNextPage}
                    >
                        Пропустить
                    </Button>
                </div>
            </div>
        </div>
    );
}
