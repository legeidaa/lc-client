"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import { UserPagesNames } from "@/shared/config/UserPagesNames";
import { ExpectationsListController } from "@/widgets/expectations-list/ui/ExpectationsListController/ExpectationsListController";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams<{ hash: string; user: string }>();

    return (
        <div className="container">
            <PageDescription textAlign="left">
                <p>
                    <b>
                        А есть ли что-то, чего вы очень ждете от вашего
                        партнера, но не получаете, или получаете, но очень мало?
                    </b>
                </p>
                <p>
                    Ведь возможно, ваш партнер даже не знает об этом. Или не
                    задумывался, что для вас это настолько важно.
                </p>
                <br />
                <p>
                    <b>Быть может, пора ему об этом сказать?</b>
                </p>
            </PageDescription>

            <ExpectationsListController />

            <Link
                href={`/game/${params.hash}/${params.user}/${UserPagesNames.MESSAGE}`}
            >
                Следующая страница
            </Link>
        </div>
    );
}
