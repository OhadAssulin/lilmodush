import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "לילמודוש | הילדים בקצב הנכון",
  description: "מוודאים שהילדים שלנו בקצב הנכון - מדרישות משרד החינוך ועד קבלה לתוכנית מחוננים, עם תרגול של 20 דקות ביום",
  keywords: ["למידה", "ילדים", "חשבון", "עברית", "מדעים", "חינוך", "משרד החינוך", "מחוננים", "ישראל"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" data-theme="dark" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
