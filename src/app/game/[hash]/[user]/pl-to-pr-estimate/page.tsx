"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { useGetGameQuery } from "@/entities/game";
import { ActionsListEstimatesContoller } from "@/widgets/actions-list-estimates";

export default function PlToPrEstimate() {
    const params = useParams<{ hash: string; user: string }>();
    const { data: game } = useGetGameQuery(params.hash);

    return (
        <div className="container">
            <PageDescription textAlign="left">
                <p>
                    <b>А сейчас начинаем наши рациональные подсчеты</b>
                </p>
                <p>
                    Оцените, сколько стоит каждое ваше действие на языке любви в
                    любкоинах. Сколько сил, времени, желания и любви вы
                    вкладываете в каждое из них.
                </p>
            </PageDescription>

            <ActionsListEstimatesContoller />

            <Link
                href={`/game/${game?.gameHash}/player/${UserPagesNames.PARTNER_TO_PLAYER_ESTIMATE}`}
            >
                Следующая страница
            </Link>
        </div>
    );
}
