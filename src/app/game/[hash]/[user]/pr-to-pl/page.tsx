"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { useGetGameQuery } from "@/entities/game";
import { ActionsListController } from "@/widgets/actions-list";

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

            <ActionsListController />

            <Link
                href={`/game/${game?.gameHash}/player/${UserPagesNames.PLAYER_TO_PARTNER_ESTIMATE}`}
            >
                Следующая страница
            </Link>
        </div>
    );
}
