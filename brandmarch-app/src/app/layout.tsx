import type { Metadata } from "next";
import "./globals.css";
import ClientThemeProvider from '../components/ClientThemeProvider';

export const metadata: Metadata = {
  title: "Brand March - Payment",
  description: "Complete your purchase with Brand March",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
