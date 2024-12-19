import type { Metadata } from "next";
import "../shared/assets/scss/index.scss";

export const metadata: Metadata = {
  title: "Lovecoin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
