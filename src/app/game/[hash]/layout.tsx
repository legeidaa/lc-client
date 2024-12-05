interface LayoutProps {
    children: React.ReactNode;
    params: { hash: string };
}

export default function Layout({ children }: LayoutProps) {

    return <>{children}</>;
}
