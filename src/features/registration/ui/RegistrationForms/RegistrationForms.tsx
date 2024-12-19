"use client";

import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./RegistrationForms.module.scss";
import { useCreatePairMutation, useGetGameQuery } from "@/shared/api";
import { useRouter, useParams } from "next/navigation";
import { CreateUserRequest, Sex } from "@/shared/interfaces/game";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { RegFormData } from "../../model/types";
import { Button } from "@/shared/components/Button/Button"
import { PlayerForm } from "../PlayerForm/PlayerForm";

export default function RegistrationForms() {
    const params = useParams<{ hash: string }>();
    const router = useRouter();
    const { gameId, gameHash, users } = useGetGameQuery(params.hash, {
        selectFromResult: ({ data }) => ({
            gameId: data?.gameId,
            gameHash: data?.gameHash,
            users: data?.users,
        }),
    });
    const [readonly, setReadonly] = useState(false);
    const [regFormData, setRegFormData] = useState<RegFormData>({
        "player-name": "",
        "player-email": "",
        "player-sex": "",
        "partner-name": "",
        "partner-email": "",
        "partner-sex": "",
    });
    const form = useRef<HTMLFormElement>(null);
    const [createPair, { isLoading: isCreatePairLoading }] =
        useCreatePairMutation();

    useEffect(() => {
        if (users?.length === 2) {
            setReadonly(true);

            const player = users.find((user) => user.role === "player");
            const partner = users.find((user) => user.role === "partner");

            setRegFormData({
                "player-name": player?.name || "",
                "player-email": player?.email || "",
                "player-sex": player?.sex || "",
                "partner-name": partner?.name || "",
                "partner-email": partner?.email || "",
                "partner-sex": partner?.sex || "",
            });
        }
    }, [users]);

    const handleSubmmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!users) {
                throw new Error("Пользователей не существует");
            }

            if (users.length < 2) {
                const createPlayerRequest: CreateUserRequest = {
                    gameId: Number(gameId),
                    name: regFormData["player-name"],
                    email: regFormData["player-email"],
                    sex: regFormData["player-sex"] as Sex,
                    role: "player",
                };

                const createPartnerRequest: CreateUserRequest = {
                    gameId: Number(gameId),
                    name: regFormData["partner-name"],
                    email: regFormData["partner-email"],
                    sex: regFormData["partner-sex"] as Sex,
                    role: "partner",
                };

                const response = await createPair([
                    createPlayerRequest,
                    createPartnerRequest,
                ]);

                if (response.error) {
                    console.error(response.error);
                } else {
                    setReadonly(true);
                    router.push(
                        `/game/${gameHash}/player/${UserPagesNames.PLAYER_TO_PARTNER}`
                    );
                }
            } else {
                // обновление
                router.push(
                    `/game/${gameHash}/player/${UserPagesNames.PLAYER_TO_PARTNER}`
                );
            }
        },
        [createPair, gameHash, gameId, regFormData, router, users]
    );
    console.log("rerender");

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form ref={form} onSubmit={handleSubmmit}>
            <div className={styles.wrapper}>
                <PlayerForm
                    role="player"
                    formData={regFormData}
                    onChange={onInputChange}
                    readonly={readonly}
                />
                <PlayerForm
                    role="partner"
                    formData={regFormData}
                    onChange={onInputChange}
                    readonly={readonly}
                />
            </div>

            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <div className={styles.circle} />
                    <p className={styles.p}>
                        Игра идет в несколько этапов, в конце каждого уровня вам
                        будут даны инструкции к дальнейшему прохождению.
                    </p>
                </li>
                <li className={styles.listItem}>
                    <div className={styles.circle} />
                    <p className={styles.p}>
                        После прохождения вами первого уровня, к игре сможет
                        присоединиться ваш партнер, для этого ему будет
                        отправленная ссылка для прохождения на указанный вами
                        e-mail.
                    </p>
                </li>
            </ul>
            <div className={styles.submitBtnWrapper}>
                <Button type="submit" disabled={isCreatePairLoading}>
                    ВСЕ ПОНЯТНО
                </Button>
            </div>
        </form>
    );
}
