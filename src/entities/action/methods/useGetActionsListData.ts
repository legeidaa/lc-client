import { useParams, usePathname } from "next/navigation";
import {
    UserPagesNames,
    userPagesNamesWithActions,
} from "@/shared/config/UserPagesNames";
import { Game, useGetGameQuery } from "@/entities/game";
import { Role, User } from "@/entities/user";
import {
    useGetActionsByTypeQuery,
    useLazyGetActionsByTypeQuery,
} from "@/entities/action";
import { getActionsType } from "@/entities/action/methods/getActionsType";
import { useEffect, useState } from "react";

function getPageName(
    path: string
): (typeof userPagesNamesWithActions)[number] | undefined {
    return userPagesNamesWithActions.find((name) => path.split('/').includes(name));
}

function getCurrentUser(game: Game | undefined, role: Role): User {
    return game?.users.find((u) => u.role === role) as User;
}

export const useGetActionsListData = () => {
    const params = useParams<{ hash: string; user: Role }>();
    const path = usePathname();
    const pageName = getPageName(path);

    if (pageName === undefined) {
        throw new Error("На этой странице нельзя получить тип действия");
    }

    const { data: game, isSuccess: isGameLoadingSuccess } = useGetGameQuery(
        params.hash
    );

    const currentUser: User = getCurrentUser(game, params.user);

    if (game && !currentUser) throw new Error("Пользователь не найден");

    const actionsType = getActionsType(params.user, pageName);

    const { data: actions, isSuccess: isActionsLoadingSuccess } =
        useGetActionsByTypeQuery(
            {
                type: actionsType,
                userId: currentUser?.userId,
            },
            { skip: !isGameLoadingSuccess && !currentUser }
        );

    // на странице partner/pr-to-pl-estimate должны быть green и gray действия
    const isPartnerPrToPl =
        params.user === "partner" &&
        pageName === UserPagesNames.PARTNER_TO_PLAYER_ESTIMATE;

    const [
        getGreenActions,
        { data: greenActions, isSuccess: isGreenActionsLoadingSuccess },
    ] = useLazyGetActionsByTypeQuery();

    //загрузка greenActions
    useEffect(() => {
        if (isPartnerPrToPl) {
            const playerId = game?.users.find(
                (u) => u.role === "player"
            )?.userId;

            if (playerId && !greenActions && !isGreenActionsLoadingSuccess) {
                console.log('get green actions');
                
                getGreenActions({
                    type: "green",
                    userId: playerId,
                });
            }
        }
    }, [
        game?.users,
        getGreenActions,
        greenActions,
        isGreenActionsLoadingSuccess,
        isPartnerPrToPl,
    ]);

    const [resultActions, setResultActions] = useState<typeof actions>();

    useEffect(() => {
        if (isActionsLoadingSuccess && actions) {
            if (
                isPartnerPrToPl &&
                greenActions &&
                isGreenActionsLoadingSuccess
            ) {
                setResultActions([...actions, ...greenActions]);
            } else {
                setResultActions(actions);
            }
        }
    }, [
        actions,
        greenActions,
        isActionsLoadingSuccess,
        isGreenActionsLoadingSuccess,
        isPartnerPrToPl,
    ]);

    return {
        params,
        game,
        currentUser,
        actions: resultActions,
        actionsType,
        isGameLoadingSuccess,
        isActionsLoadingSuccess,
        pageName,
    };
};
