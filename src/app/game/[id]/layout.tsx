"use client";

import { useGetGameQuery } from "@/lib/redux/gameApi";
import { redirect } from "next/navigation";

interface DashboardProps {
    children: React.ReactNode;
    params: { id: string };
}

export default function Layout({ children, params }: DashboardProps) {
    const gameQuery = useGetGameQuery(params.id);
    if (gameQuery.isLoading) {
        return <div>Loading [id] layout...</div>;
    }
    if (gameQuery.isError) {
        redirect("/not-found");
    }
    if (gameQuery.isSuccess) {
        return <>{children}</>;
    }
}
