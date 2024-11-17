"use client";
import { ActionsList } from "@/shared/components/ActionsList/ActionsList";
import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import styles from "./page.module.scss";
import { useGetActionsByTypeQuery, useGetGameQuery } from "@/lib/redux/gameApi";
import { useParams, useRouter } from "next/navigation";
import { Action } from "@/shared/interfaces/game";
// import { useParams } from "next/navigation";

export default function Home() {
    // if currentRole === 'player' грузим зеленые данные
    // if currentRole === 'partner' грузим синие данные
    const params = useParams<{ hash: string; user: string }>();
    const router = useRouter();
    const gameData = useGetGameQuery(params.hash);

    // if (gameData.isLoading) {
    //     return <div>Loading [id] layout...</div>;
    // }

    if (gameData.isError) {
        // TODO заменить на компонент
        router.push("/not-found");
    }
    const actionsType = params.user === "player" ? "green" : "blue";
    // console.log(params);

    const actions = useGetActionsByTypeQuery({
        type: actionsType,
        userId: 3,
    });
    console.log(actions.data);

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

            {
                actions.data && (
                    <ActionsList
                        actions={actions.data as Action[]}
                        onInputChange={() => {}}
                        onRowDelete={() => {}}
                        onAddClick={() => {}}
                    />
                )
            }

        </div>
    );
}
