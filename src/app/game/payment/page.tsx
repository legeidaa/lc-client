"use client";
import { useCreateGameMutation } from "@/lib/redux/gameApi";
import { StartInfo } from "@/shared/components/StartInfo/StartInfo";
import { redirect } from "next/navigation";

export default function Payment() {
    const [createGameMutation, createGameResult] = useCreateGameMutation();

    const createGame = async () => {
        // здесь сперва оплата, потом создание игры при успехе
        await createGameMutation();
    };
    if (createGameResult.isLoading) {
        return <div>Loading...</div>;
    }
    if (createGameResult.isSuccess) {

        // TODO заменить на router.push
        redirect(`/game/${createGameResult.data.gameHash}/start`);
    }
    return (
        <div className="container">
            <StartInfo />
            <button className="btn" onClick={createGame}>
                ОПЛАТИТЬ
            </button>
        </div>
    );
}
