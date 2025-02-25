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
import { useEffect, useMemo } from "react";
import { GetActionsByTypeRequest } from "../model/types";

// function getPageName(
//     path: string
// ): (typeof userPagesNamesWithActions)[number] | undefined {
//     return userPagesNamesWithActions.find((name) =>
//         path.split("/").includes(name)
//     );
// }

// function getUser(game: Game | undefined, role: Role): User {
//     return game?.users.find((u) => u.role === role) as User;
// }

// export const useGetActionsListData = () => {
//     const params = useParams<{ hash: string; user: Role }>();
//     const path = usePathname();
//     const pageName = getPageName(path);

//     if (pageName === undefined) {
//         throw new Error("На этой странице нельзя получить тип действия");
//     }

//     const { data: game, isSuccess: isGameLoadingSuccess } = useGetGameQuery(
//         params.hash
//     );

//     const currentUser: User = getUser(game, params.user);

//     if (game && !currentUser) throw new Error("Пользователь не найден");

//     const actionsType = getActionsType(params.user, pageName);

//     const { data: actions, isSuccess: isActionsLoadingSuccess } =
//         useGetActionsByTypeQuery(
//             {
//                 type: actionsType,
//                 userId: currentUser?.userId,
//             },
//             { skip: !isGameLoadingSuccess && !currentUser }
//         );

//     // на странице partner/pr-to-pl-estimate должны быть green и gray действия
//     const isPartnerPrToPlPage =
//         params.user === "partner" &&
//         pageName === UserPagesNames.PARTNER_TO_PLAYER_ESTIMATE;

//     const [
//         getGreenActions,
//         { data: greenActions, isSuccess: isGreenActionsLoadingSuccess },
//     ] = useLazyGetActionsByTypeQuery();

//     //загрузка greenActions
//     useEffect(() => {
//         if (!isPartnerPrToPlPage) return;
//         if (game) {
//             const player = getUser(game, "player");

//             if (
//                 player.userId &&
//                 !greenActions &&
//                 !isGreenActionsLoadingSuccess
//             ) {
//                 getGreenActions({
//                     type: "green",
//                     userId: player.userId,
//                 });
//             }
//         }
//     }, [
//         game,
//         getGreenActions,
//         greenActions,
//         isGreenActionsLoadingSuccess,
//         isPartnerPrToPlPage,
//     ]);

//     const resultActions = useMemo(()=> {
//         if (!(isActionsLoadingSuccess && actions)) return;

//         if (
//             isPartnerPrToPlPage &&
//             greenActions &&
//             isGreenActionsLoadingSuccess
//         ) {
//             return [...actions, ...greenActions]
//         } else {
//             return actions
//         }
//     }, [actions, greenActions, isActionsLoadingSuccess, isGreenActionsLoadingSuccess, isPartnerPrToPlPage])

//     return {
//         params,
//         game,
//         currentUser,
//         actions: resultActions,
//         actionsType,
//         isGameLoadingSuccess,
//         isActionsLoadingSuccess,
//         pageName,
//         isPartnerPrToPlPage,
//     };
// };

export const useGetActionsListData = (
    actionsToFetch: GetActionsByTypeRequest[]
) => {
    // const params = useParams<{ hash: string; user: Role }>();
    // const path = usePathname();
    // const pageName = getPageName(path);

    // if (pageName === undefined) {
    //     throw new Error("На этой странице нельзя получить тип действия");
    // }

    // const { data: game, isSuccess: isGameLoadingSuccess } = useGetGameQuery(
    //     params.hash
    // );

    // const currentUser: User = getUser(game, params.user);

    // if (game && !currentUser) throw new Error("Пользователь не найден");

    // const actionsType = getActionsType(params.user, pageName);

    const [trigger, data] = useLazyGetActionsByTypeQuery();

    useEffect(() => {
        let args = {};
        console.log(actionsToFetch);
        
        if (actionsToFetch) {
            const promises = actionsToFetch.map((req) => {
                return trigger(req);

                // console.log(a, data);
            });
            Promise.all(promises).then((res) => console.log(res, data));
            // actionsToFetch.forEach(req => {
            //     trigger(req)
            //     console.log(data.data);

            // })
        }
    }, [actionsToFetch, data, trigger]);



    // на странице partner/pr-to-pl-estimate должны быть green и gray действия
    // const isPartnerPrToPlPage =
    //     params.user === "partner" &&
    //     pageName === UserPagesNames.PARTNER_TO_PLAYER_ESTIMATE;

    // const [
    //     getGreenActions,
    //     { data: greenActions, isSuccess: isGreenActionsLoadingSuccess },
    // ] = useLazyGetActionsByTypeQuery();

    // //загрузка greenActions
    // useEffect(() => {
    //     if (!isPartnerPrToPlPage) return;
    //     if (game) {
    //         const player = getUser(game, "player");

    //         if (
    //             player.userId &&
    //             !greenActions &&
    //             !isGreenActionsLoadingSuccess
    //         ) {
    //             getGreenActions({
    //                 type: "green",
    //                 userId: player.userId,
    //             });
    //         }
    //     }
    // }, [
    //     game,
    //     getGreenActions,
    //     greenActions,
    //     isGreenActionsLoadingSuccess,
    //     isPartnerPrToPlPage,
    // ]);

    // const resultActions = useMemo(() => {
    //     if (!(isActionsLoadingSuccess && actions)) return;

    //     if (
    //         isPartnerPrToPlPage &&
    //         greenActions &&
    //         isGreenActionsLoadingSuccess
    //     ) {
    //         return [...actions, ...greenActions];
    //     } else {
    //         return actions;
    //     }
    // }, [
    //     actions,
    //     greenActions,
    //     isActionsLoadingSuccess,
    //     isGreenActionsLoadingSuccess,
    //     isPartnerPrToPlPage,
    // ]);

    // return {
    //     params,
    //     game,
    //     currentUser,
    //     actions: resultActions,
    //     actionsType,
    //     isGameLoadingSuccess,
    //     isActionsLoadingSuccess,
    //     pageName,
    //     isPartnerPrToPlPage,
    // };
};
