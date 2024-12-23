"use client";

import { useGetGameQuery } from "@/entities/game";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { notFound } from "next/navigation";
interface LayoutProps {
    children: React.ReactNode;
    params: { hash: string };
}

export default function Layout({ children, params }: LayoutProps) {
    const { error, isLoading } = useGetGameQuery(params.hash);
    if (error && "status" in error && error.status === 404) {
        notFound();
    }
    if(isLoading) return <LoadingSpinner align="center"/>

    return <>{children}</>;
}
