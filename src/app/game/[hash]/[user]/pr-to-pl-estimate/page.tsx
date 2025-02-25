"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { ActionsListEstimatesContoller } from "@/widgets/actions-list-estimates";
import { Role } from "@/entities/user";
import { useGetGameQuery } from "@/entities/game";
import { GetActionsByTypeRequest } from "@/entities/action/model/types";
import { getGameUser } from "@/entities/game/utils/getGameUser";
import { useEffect, useState } from "react";

export default function PlToPrEstimate() {
    const params = useParams<{ hash: string; user: Role }>();

    const { data: game } = useGetGameQuery(params.hash);

    // const currentUser: User = getUser(game, params.user);

    // if (game && !currentUser) throw new Error("Пользователь не найден");

    // const actionsType = getActionsType(params.user, pageName);

    const [actionsToFetch, setActionsToFetch] = useState<
        GetActionsByTypeRequest[]
    >([]);

    useEffect(() => {
        if (!game) return;
        const player = getGameUser(game, "player");
        const partner = getGameUser(game, "partner");

        if (params.user === "player") {
            setActionsToFetch([{ type: "yellow", userId: player.userId }]);
        } else if (params.user === "partner") {
            setActionsToFetch([
                { type: "gray", userId: partner.userId },
                { type: "green", userId: player.userId },
               
            ]);
        }
    }, [game, params.user]);

    return (
        <div className="container">
            <PageDescription textAlign="left">
                <p>
                    А теперь оцените, сколько сил, времени, желания и любви на
                    ваш взгляд, ваш партнер вкладывает в каждое из этих действий
                </p>
            </PageDescription>

            <ActionsListEstimatesContoller actionsToFetch={actionsToFetch} />

            <Link
                href={`/game/${params.hash}/${params.user}/${UserPagesNames.EXPECTATIONS}`}
            >
                Следующая страница
            </Link>
        </div>
    );
}
