import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Countries app",
  description: "A list of countries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"mx-auto max-w-7xl"}>{children}</body>
    </html>
  );
}
