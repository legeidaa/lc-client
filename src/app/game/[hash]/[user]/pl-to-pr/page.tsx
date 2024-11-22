"use client";

import { ActionsList } from "@/shared/components/ActionsList/ActionsList";
import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import styles from "./page.module.scss";
import { useGetActionsByTypeQuery, useGetGameQuery } from "@/lib/redux/gameApi";
import { useParams } from "next/navigation";
import { User } from "@/shared/interfaces/game";
import { useCallback } from "react";

export default function Home() {
    const params = useParams<{ hash: string; user: string }>();

    const { data: game, isSuccess } = useGetGameQuery(params.hash);

    const currentUser = game?.users.find((u) => u.role === params.user) as User;
    const actionsType = params.user === "player" ? "green" : "blue";

    const { data: actions, isSuccess: isActionsSuccess } =
        useGetActionsByTypeQuery(
            {
                type: actionsType,
                userId: currentUser?.userId,
            },
            { skip: !isSuccess && !currentUser }
        );

    console.log("update", actions);

    // const [errorText, setErrorText] = useState("")

    const actionsList = useCallback(() => {
        if (isActionsSuccess) {
            return (
                <ActionsList
                    actions={actions}
                    actionsType={actionsType}
                    user={currentUser}
                    placeholder="Что вы делаете"
                />
            );
        }
        return <div>Загрузка</div>;
    }, [actions, actionsType, currentUser, isActionsSuccess]);
    return (
        <div className="container">
            <PageDescription textAlign="center">
                <p>
                    А сейчас я попрошу вас вспомнить и вписать все, что вы
                    делаете (или наоборот, не делаете) ДЛЯ и РАДИ своего
                    партнера.
                </p>
                <p>
                    Это могут быть бытовые дела, эмоциональные, практические
                    действия.
                </p>
            </PageDescription>

            <div className={styles.example}>
                <h3>Пример</h3>
                <div className={styles.exampleCols}>
                    <div className={styles.exampleCol}>
                        <h4>Бытовые</h4>
                        <ul>
                            <li>Стираю</li>
                            <li>Готовлю</li>
                            <li>Убираю</li>
                        </ul>
                    </div>
                    <div className={styles.exampleCol}>
                        <h4>Эмоциональные</h4>
                        <ul>
                            <li>Поддерживаю в трудные моменты</li>
                            <li>Целую перед выходом на работу</li>
                        </ul>
                    </div>
                    <div className={styles.exampleCol}>
                        <h4>Практические</h4>
                        <ul>
                            <li>Грею машину в зимнее время</li>
                            <li>Помогаю в работе</li>
                        </ul>
                    </div>
                </div>
            </div>

            {actionsList()}
        </div>
    );
}
