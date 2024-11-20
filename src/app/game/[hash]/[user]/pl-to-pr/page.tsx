"use client";
import { ActionsList } from "@/shared/components/ActionsList/ActionsList";
import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import styles from "./page.module.scss";
import { useGetGameQuery } from "@/lib/redux/gameApi";
import { useParams, useRouter } from "next/navigation";
import { Action, User } from "@/shared/interfaces/game";
// import { useParams } from "next/navigation";

interface InitialAction extends Action {
    blank: boolean;
}

export default function Home() {
    const params = useParams<{ hash: string; user: string }>();
    // const router = useRouter();

    const game = useGetGameQuery(params.hash);
    console.log(game);

    if (game.isError) {
        // TODO заменить на компонент c ошибкой
        // router.push("/not-found");
    }


    // TODO перенести логику внутрь ActionsList

    // const actionsType = params.user === "player" ? "green" : "blue";

    const actionsList = () => {
        if (game.isSuccess) {
            const currentUser = game.data?.users.find(
                (u) => u.role === params.user
            ) as User;

            const initialActions: InitialAction[] = new Array(4).fill({
                userId: currentUser.userId,
                cost: 0,
                title: "",
                // помечаем, что это initial action
                blank: true
            });

            const actions =
                currentUser.actions.length > 0
                    ? currentUser.actions
                    : initialActions;

            return (
                <ActionsList
                    actions={actions}
                    onInputChange={() => {}}
                    onRowDelete={() => {}}
                    onAddClick={() => {}}
                />
            );
        }
        return;
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
