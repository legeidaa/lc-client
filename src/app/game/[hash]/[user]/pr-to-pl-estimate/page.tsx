"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { ActionsListEstimatesContoller } from "@/widgets/actions-list-estimates";
import { Role } from "@/entities/user";

export default function PlToPrEstimate() {
    const params = useParams<{ hash: string; user: Role }>();

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
                href={`/game/${params.hash}/${params.user}/${UserPagesNames.EXPECTATIONS}`}
            >
                Следующая страница
            </Link>
        </div>
    );
}
