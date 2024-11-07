import Logo from "@/img/logo.svg";
import Image from "next/image";
import StoreProvider from "../../shared/components/providers/StoreProvider";
import styles from "./layout.module.scss";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <header className={styles.header}>
                <Image width={570} src={Logo} alt="Логотип" />
            </header>
            <main>{children}</main>
        </StoreProvider>
    );
}
