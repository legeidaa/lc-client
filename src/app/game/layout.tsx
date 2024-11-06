import Logo from "@/img/logo.svg";
import Image from "next/image";
import StoreProvider from "../../shared/components/providers/StoreProvider";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <header className="logo-container">
                <Image width={570} src={Logo} alt="Логотип" />
            </header>
            <main>{children}</main>
        </StoreProvider>
    );
}
