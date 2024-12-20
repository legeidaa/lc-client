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
                    А теперь оцените, сколько сил, времени, желания и любви на
                    ваш взгляд, ваш партнер вкладывает в каждое из этих действий
                </p>
            </PageDescription>

            <ActionsListEstimatesContoller />

            <Link
                href={`/game/${game?.gameHash}/player/${UserPagesNames.EXPECTATIONS}`}
            >
                Следующая страница
            </Link>
        </div>
    );
}
