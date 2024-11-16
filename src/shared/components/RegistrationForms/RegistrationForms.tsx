"use client";

import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Input } from "../Input/Input";
import { SexRadioInput } from "../SexRadioInput/SexRadioInput";
import styles from "./RegistrationForms.module.scss";
import classNames from "classnames";
import {
    useCreatePairMutation,
    useGetGameQuery,
    useLazyGetUsersQuery,
} from "@/lib/redux/gameApi";
import { useRouter, useParams } from "next/navigation";
import { CreateUserRequest, Sex, User } from "@/shared/interfaces/game";

interface RegFormData {
    "player-name": string;
    "player-email": string;
    "player-sex": string;
    "partner-name": string;
    "partner-email": string;
    "partner-sex": string;
}

export default function RegistrationForms() {
    const params = useParams<{ hash: string }>();
    const router = useRouter();
    const { gameId, gameHash } = useGetGameQuery(params.hash, {
        selectFromResult: ({ data }) => ({
            gameId: data?.gameId,
            gameHash: data?.gameHash,
        }),
    });

    const [getUsersQuery] = useLazyGetUsersQuery();
    const [users, setUsers] = useState<User[]>([]);
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
    const [createPair] = useCreatePairMutation();
    console.log("update", regFormData);

    // получение данных об игроках и подстановка в поля
    useEffect(() => {
        console.log("useeffect update");

        const fetchUsers = async () => {
            if (!gameId) return;
            const users = await getUsersQuery(gameId);

            if (users.isSuccess && users.data.length === 2) {
                setUsers(users.data);
                console.log(users);

                setReadonly(true);

                const player = users.data.find(
                    (user) => user.role === "player"
                );
                const partner = users.data.find(
                    (user) => user.role === "partner"
                );

                setRegFormData({
                    "player-name": player?.name || "a",
                    "player-email": player?.email || "",
                    "player-sex": player?.sex || "",
                    "partner-name": partner?.name || "",
                    "partner-email": partner?.email || "",
                    "partner-sex": partner?.sex || "",
                });
            }
        };
        fetchUsers();
    }, [gameId, getUsersQuery]);

    const handleSubmmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
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
                router.push(`/game/${gameHash}/player/pl-to-pr`);
            }
        } else {
            console.log(users);
            router.push(`/game/${gameHash}/player/pl-to-pr`);
        }
    }, [createPair, gameHash, gameId, regFormData, router, users]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    return (
        <form ref={form} onSubmit={handleSubmmit}>
            <div className={styles.wrapper}>
                <div className={styles.playerForm}>
                    <h3 className={styles.playerFormTitle}>
                        Введите <b>ваше</b> имя, пол и электронную почту
                    </h3>
                    <div className={styles.playerFormBlock}>
                        <Input
                            name="player-name"
                            id="player-name"
                            inputStyle="Small"
                            type="text"
                            label="Ваше имя:"
                            value={regFormData["player-name"]}
                            onChange={onInputChange}
                            readOnly={readonly}
                            required
                        />
                        <Input
                            name="player-email"
                            id="player-email"
                            inputStyle="Small"
                            type="email"
                            value={regFormData["player-email"]}
                            label="Ваша электронная почта:"
                            readOnly={readonly}
                            onChange={onInputChange}
                            required
                        />
                        <div className={styles.playerFormSex}>
                            <span className={styles.label}>Пол: </span>
                            <SexRadioInput
                                name="player-sex"
                                type="female"
                                id="player-female"
                                value={regFormData["player-sex"]}
                                checked={regFormData["player-sex"] === "female"}
                                onChange={onInputChange}
                                disabled={readonly}
                                required
                            />
                            <SexRadioInput
                                name="player-sex"
                                type="male"
                                id="player-male"
                                checked={regFormData["player-sex"] === "male"}
                                onChange={onInputChange}
                                disabled={readonly}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.playerForm}>
                    <h3 className={styles.playerFormTitle}>
                        Введите имя, пол, и электронную почту вашего
                        <b> партнера</b>
                    </h3>
                    <div className={styles.playerFormBlock}>
                        <Input
                            name="partner-name"
                            id="partner-name"
                            type="text"
                            inputStyle="Small"
                            value={regFormData["partner-name"]}
                            label="Ваше имя:"
                            readOnly={readonly}
                            onChange={onInputChange}
                        />
                        <Input
                            name="partner-email"
                            id="partner-email"
                            type="email"
                            inputStyle="Small"
                            value={regFormData["partner-email"]}
                            label="Ваша электронная почта:"
                            readOnly={readonly}
                            onChange={onInputChange}
                        />
                        <div className={styles.playerFormSex}>
                            <span className={styles.label}>Пол: </span>
                            <SexRadioInput
                                name="partner-sex"
                                type="female"
                                id="partner-female"
                                checked={
                                    regFormData["partner-sex"] === "female"
                                }
                                onChange={onInputChange}
                                disabled={readonly}
                                required
                            />
                            <SexRadioInput
                                name="partner-sex"
                                type="male"
                                id="partner-male"
                                checked={regFormData["partner-sex"] === "male"}
                                onChange={onInputChange}
                                disabled={readonly}
                                required
                            />
                        </div>
                    </div>
                </div>
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
                {}
                <button
                    className={classNames("btn", styles.submitBtn)}
                    type="submit"
                >
                    ВСЕ ПОНЯТНО
                </button>
            </div>
        </form>
    );
}
