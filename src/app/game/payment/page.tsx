"use client";
import { useCreateGameMutation } from "@/lib/redux/gameApi";
import { StartInfo } from "@/shared/components/StartInfo/StartInfo";
import { use } from "react";

export default function Payment() {
    const [
        createGameMutation,
        { error: createGameError, isLoading: createGameIsLoading },
    ] = useCreateGameMutation();

    const createGame = async () => {
        const game = await createGameMutation();
        if (game) {
            console.log(game.data);
        }
    };
    return (
        <div className="container">
            {/* отправляем запрос на оплату и создаем юзера в бд */}
            <StartInfo />
            <button className="btn" onClick={() => createGame()}>
                ОПЛАТИТЬ
            </button>
        </div>
    );
}
