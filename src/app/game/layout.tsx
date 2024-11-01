import Logo from "@/img/logo.svg";
import Image from "next/image";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="logo-container">
                <Image width={570} src={Logo} alt="Логотип" />
            </header>
            <main>{children}</main>
        </>
    );
}
