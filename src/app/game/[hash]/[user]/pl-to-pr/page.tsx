"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import styles from "./page.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { ActionsListController } from "@/widgets/actions-list";


export default function Home() {
    const params = useParams<{ hash: string; user: string }>();

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
            <ActionsListController />

            <Link href={`/game/${params.hash}/${params.user}/${UserPagesNames.RESOURCES}`}>Следующая страница</Link>
        </div>
    );
}
