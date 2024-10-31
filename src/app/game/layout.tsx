import Image from "next/image";
import Logo from "@/assets/img/logo.svg";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>  
            <header className="logo-container">
                <Image src={Logo} alt="logo" width={570}/>
            </header>
            <main>{children}</main>
        </>
    );
}
