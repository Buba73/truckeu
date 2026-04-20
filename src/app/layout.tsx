import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TruckEU – Dopravní portál pro řidiče",
  description: "Zákazy jízd, omezení, uzavírky a rady pro kamionovou dopravu v celé Evropě.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
