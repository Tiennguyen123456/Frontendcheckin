import Provider from "@/redux/root/provider";
import type { Metadata } from "next";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { Roboto } from "next/font/google";
import ThemeRegistry from "../../theme/ThemeRegistry";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Check-in Dashboard",
  description: "Check-in Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ** I18n
  const locale = useLocale();
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <head>
          <title>Check-in Dashboard</title>
        </head>

        <ThemeRegistry>
          <body className={roboto.className}>
            <Provider>{children}</Provider>
          </body>
        </ThemeRegistry>
      </html>
    </NextIntlClientProvider>
  );
}
