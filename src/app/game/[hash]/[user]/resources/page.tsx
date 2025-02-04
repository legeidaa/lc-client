"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import styles from "./page.module.scss";
import { Button, ButtonSize } from "@/shared/components/Button/Button";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { useGetGameQuery } from "@/entities/game";
import { User, useUpdateUserResourcesMutation } from "@/entities/user";

export default function Resources() {
    const params = useParams<{ hash: string; user: string }>();
    const router = useRouter();

    const { data: game } = useGetGameQuery(params.hash);
    const [updateResources, {isLoading: isUpdateResourcesLoading }] = useUpdateUserResourcesMutation();

    const user: User = game?.users.find((u) => u.role === params.user) as User;

    const handleChangeResources = async (data: boolean) => {
        if (!user) throw new Error("Пользователь не найден");

        await updateResources({
            hasResources: data,
            userId: user.userId,
        });   

        router.push(`/game/${params.hash}/${params.user}/${UserPagesNames.PARTNER_TO_PLAYER}`);
    };   

    return (
        <div className="container">
            <PageDescription textAlign="center">
                <p>
                    Как вы думаете, хватает ли у вас сил, времени и ресурсов
                    делать что-то и для себя?
                </p>
            </PageDescription>

            <div className={styles.buttons}>
                <Button
                    size={ButtonSize.L}
                    type="button"
                    disabled={isUpdateResourcesLoading}
                    onClick={() => handleChangeResources(true)}
                >
                    ДА, МНЕ ХВАТАЕТ СИЛ И ЖЕЛАНИЯ ДЕЛАТЬ И ДЛЯ
                    <br />
                    СЕБЯ И ДЛЯ
                    ЛЮБИМЫХ
                </Button>
                <Button
                size={ButtonSize.L}
                    type="button"
                    disabled={isUpdateResourcesLoading}
                    onClick={() => handleChangeResources(false)}
                >
                    К СОЖАЛЕНИЮ, НА СЕБЯ ОСТАЕТСЯ МАЛО
                </Button>

                <Link href={`/game/${params.hash}/${params.user}/${UserPagesNames.PARTNER_TO_PLAYER}`}>Следующая страница</Link>
            </div>
        </div>
    );
}
