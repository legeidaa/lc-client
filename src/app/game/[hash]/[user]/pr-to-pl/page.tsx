"use client";

import { ActionsList } from "@/shared/components/ActionsList/ActionsList";
import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetGameQuery } from "@/lib/redux/gameApi";
import { UserPagesNames } from "@/shared/config/UserPagesNames";

export default function Home() {
    const params = useParams<{ hash: string; user: string }>();
    const { data: game } = useGetGameQuery(params.hash);

    return (
        <div className="container">
            <PageDescription textAlign="center">
                <p>
                    А теперь напишите, что ДЛЯ ВАС и РАДИ ВАС в отношениях
                    делает (или наоборот не делает) ваш партнер?
                </p>
                <p>
                    Вспомните все моменты, это также могут быть бытовые,
                    эмоциональные, практические действия.
                </p>
            </PageDescription>

            <ActionsList />

            <Link
                href={`/game/${game?.gameHash}/player/${UserPagesNames.PLAYER_TO_PARTNER_COST}`}
            >
                Следующая страница
            </Link>
        </div>
    );
}
