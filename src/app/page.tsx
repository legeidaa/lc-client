import Link from "next/link";

export default function Home() {
    return (
        <div>
            Лендинг
            <Link href="/game/payment">Оплата</Link>
        </div>
    );
}