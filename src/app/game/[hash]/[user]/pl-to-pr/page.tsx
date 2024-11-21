"use client";

import { ActionsList } from "@/shared/components/ActionsList/ActionsList";
import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import styles from "./page.module.scss";
import { useGetActionsByTypeQuery, useGetGameQuery } from "@/lib/redux/gameApi";
import { useParams } from "next/navigation";
import { InitialAction, User } from "@/shared/interfaces/game";

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

    // const [errorText, setErrorText] = useState("")

    const actionsList = () => {
        if (isActionsSuccess) {
            function createActions(num: number) {
                const initialActions: InitialAction[] = new Array(num)
                    .fill(null)
                    .map(() => {
                        return {
                            userId: currentUser.userId,
                            cost: null,
                            title: "",
                            type: actionsType,
                            // помечаем, что это initial action
                            initial: true,
                            actionId: Date.now() + Math.random(),
                        };
                    });
                return initialActions;
            }

            const newActions =
                actions.length > 4
                    ? (actions as InitialAction[])
                    : ([
                          ...actions,
                          ...createActions(4 - actions.length),
                      ] as InitialAction[]);

            return (
                <ActionsList
                    actions={newActions}
                    actionsType={actionsType}
                    user={currentUser}
                    placeholder="Что вы делаете"
                />
            );
        }
        return <div>Загрузка</div>;
    };
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
