import "@ant-design/v5-patch-for-react-19";
import '@fontsource/figtree/300.css';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/500.css';
import '@fontsource/figtree/600.css';
import '@fontsource/figtree/700.css';
import type { Metadata } from "next";
import "./globals.css";
import MainProvider from "../providers/main.provider";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased main-scroll`}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
