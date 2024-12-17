"use client";
import { useCreateGameMutation } from "@/shared/api";
import { Button } from "@/shared/components/Button/Button";
import { StartInfo } from "@/shared/components/StartInfo/StartInfo";
import { useRouter } from "next/navigation";

export default function Payment() {
    const [createGameMutation, createGameResult] = useCreateGameMutation();
    const router = useRouter();

    const createGame = async () => {
        // здесь сперва оплата, потом создание игры при успехе
        await createGameMutation();
    };
    if (createGameResult.isLoading) {
        return <div>Loading...</div>;
    }
    if (createGameResult.isSuccess) {
        router.push(`/game/${createGameResult.data.gameHash}/start`);
    }
    return (
        <div className="container">
            <StartInfo />
            <Button type="button" onClick={createGame}>ОПЛАТИТЬ</Button>
        </div>
    );
}
