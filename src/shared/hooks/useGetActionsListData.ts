import { useGetActionsByTypeQuery, useGetGameQuery } from "@/lib/redux/gameApi";
import { Role, User } from "../interfaces/game";
import { useParams, usePathname } from "next/navigation";
import { getActionsType } from "../utils/getActionsType";
import { userPagesNamesWithActions } from "../config/UserPagesNames";

export const useGetActionsListData = () => {
    const params = useParams<{ hash: string; user: string }>();
    const path = usePathname();

    let pageName: (typeof userPagesNamesWithActions)[number] | undefined;

    userPagesNamesWithActions.forEach((name) => {
        if (path.includes(name)) {
            pageName = name;
        }
    });

    if (pageName === undefined) {
        throw new Error("На этой странице нельзя получить тип действия");
    }

    const { data: game, isSuccess: isGameLoadingSuccess } = useGetGameQuery(
        params.hash
    );
    const currentUser: User = game?.users.find(
        (u) => u.role === params.user
    ) as User;

    if (game && !currentUser) throw new Error("Пользователь не найден");

    const actionsType = getActionsType(params.user as Role, pageName);

    const { data: actions, isSuccess: isActionsLoadingSuccess } =
        useGetActionsByTypeQuery(
            {
                type: actionsType,
                userId: currentUser?.userId,
            },
            { skip: !isGameLoadingSuccess && !currentUser }
        );

    return {
        params,
        game,
        currentUser,
        actions,
        actionsType,
        isGameLoadingSuccess,
        isActionsLoadingSuccess,
    };
};
