"use client"; // Error components must be Client Components

import { Button } from "@/shared/components/Button/Button";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container">
            <h2>Что-то пошло не так</h2>
            <Button type="button" onClick={() => reset()}>
                Попробовать снова
            </Button>
        </div>
    );
}
