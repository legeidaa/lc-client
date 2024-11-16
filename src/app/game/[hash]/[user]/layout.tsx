"use client";

import { useGetGameQuery, useGetUsersQuery } from "@/lib/redux/gameApi";
import { redirect, useParams } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
    params: { hash: string; user: string };
}

export default function Layout({ children, params }: LayoutProps) {
    // if currentRole === 'player' грузим зеленые данные
    // if currentRole === 'partner' грузим синие данные
    const { gameId } = useGetGameQuery(params.hash, {
        selectFromResult: ({ data }) => ({
            gameId: data?.gameId,
        }),
    });
    // if (!gameId) {

    //     // заменить на useRouter
    //     // redirect("/not-found");
        
    // }
    // const users = useGetUsersQuery(gameId);

    console.log(gameId);

    return <>{children}</>;
}
