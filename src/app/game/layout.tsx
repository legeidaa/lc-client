import Logo from "@/img/logo.svg";
import Image from "next/image";
import styles from "./layout.module.scss";
import StoreProvider from "@/fsd-app/redux/StoreProvider";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <header className={styles.header}>
                <Image width={570} height={189} src={Logo} alt="Логотип" priority/>
            </header>
            <main>{children}</main>
        </StoreProvider>
    );
}
