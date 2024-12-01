import {
    useGetActionsByTypeQuery,
    useGetGameQuery,
} from "@/lib/redux/gameApi";
import { ActionType, Role, User } from "../interfaces/game";
import { useParams, usePathname } from "next/navigation";
import { getActionsType } from "../utils/getActionsType";

export const useGetActionsListData = () => {
    const params = useParams<{ hash: string; user: string }>();
    const path = usePathname()
    let pageName: "pl-to-pr" | "pr-to-pl" | undefined;
    
    if (path.includes("pl-to-pr")) {
        pageName = "pl-to-pr";
    } else if (path.includes("pr-to-pl")) {
        pageName = "pr-to-pl";
    }

    if (pageName === undefined) throw new Error("На этой странице нельзя получить тип действия");

    const { data: game, isSuccess: isGameLoadingSuccess } = useGetGameQuery(
        params.hash
    );
    const user: User = game?.users.find((u) => u.role === params.user) as User;

    if (game && !user) throw new Error("Пользователь не найден");

    const actionsType: ActionType = getActionsType(params.user as Role, pageName);

    const { data: actions, isSuccess: isActionsLoadingSuccess } =
        useGetActionsByTypeQuery(
            {
                type: actionsType,
                userId: user?.userId,
            },
            { skip: !isGameLoadingSuccess && !user }
        );

    
    return {
        params,
        game,
        user,
        actions,
        actionsType,
        isGameLoadingSuccess,
        isActionsLoadingSuccess,
    };
};
