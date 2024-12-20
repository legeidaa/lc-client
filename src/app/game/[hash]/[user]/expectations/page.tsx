"use client";

import { PageDescription } from "@/shared/components/PageDescription/PageDescription";
import { ExpectationsListController } from "@/widgets/expectations-list/ui/ExpectationsListController/ExpectationsListController";

export default function Home() {
    // const params = useParams<{ hash: string; user: string }>();
    // const { data: game } = useGetGameQuery(params.hash);

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

            {/* <Link
                href={`/game/${game?.gameHash}/player/${UserPagesNames.PLAYER_TO_PARTNER_ESTIMATE}`}
            >
                Следующая страница
            </Link> */}
        </div>
    );
}
