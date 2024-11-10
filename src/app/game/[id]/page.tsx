"use client";
import { useParams } from "next/navigation";

export default function Home() {
    // if currentRole === 'player' грузим зеленые данные
    // if currentRole === 'partner' грузим синие данные
    const params = useParams<{ id: string; user: string }>();
    console.log(params);

    return (
        <div>
            <main>id page</main>
        </div>
    );
}
