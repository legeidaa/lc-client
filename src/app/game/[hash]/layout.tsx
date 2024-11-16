"use client";

import { useGetGameQuery } from "@/lib/redux/gameApi";
import { useRouter } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
    params: { hash: string };
}

export default function Layout({ children, params }: LayoutProps) {
    const gameQuery = useGetGameQuery(params.hash);

    const router = useRouter();
    if (gameQuery.isLoading) {
        return <div>Loading [id] layout...</div>;
    }
    if (gameQuery.isError) {
        router.push("/not-found");
    }
    if (gameQuery.isSuccess) {
        return <>{children}</>;
    }
    return;
}
