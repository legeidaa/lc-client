"use client";

import { Role } from "@/entities/user";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";
import { useChangeCurrentUserRoleMutation, useGetGameQuery } from "@/entities/game/api/gameApi";
import { useEffect } from "react";

export default function ChangePlayer() {
    const params = useParams<{ hash: string; user: Role }>();
    const appLink = window.location.host;
    const {data: game} = useGetGameQuery(params.hash)
    const [changeCurrentUserRole] = useChangeCurrentUserRoleMutation();
    console.log(game);
    
    useEffect(() => {
        if (game && game.currentUserRole === "player")
        changeCurrentUserRole({ hash: params.hash, roleToUpdate: "partner" });
    }, [game, changeCurrentUserRole, params.hash]);

    return (
        <div className="container">
            <div className={styles.link}>
                {`${appLink}/game/${params.hash}/partner/start`}
            </div>
            <p className={styles.descrS}>
                Отправьте эту ссылку вашему партнеру для прохождения игры.
                Ссылка также отправлена электронную почту, которую вы указали.
            </p>
            <p className={styles.descrL}>
                Ожидаем прохождения первого этапа игры вашим партнером. Как
                только он закончит – вам придет уведомление на электронную
                почту, и вы сможете продолжить.
            </p>
        </div>
    );
}
