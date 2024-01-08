import Provider from "@/redux/root/provider";
import type { Metadata } from "next";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { Roboto } from "next/font/google";
import ThemeRegistry from "../../theme/ThemeRegistry";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
	title: "Check-in Dashboard",
	description: "Check-in Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = useLocale();
	const messages = useMessages();

	return (
		<ClerkProvider>
			<html lang={locale}>
				<head>
					<title>Check-in Dashboard</title>
				</head>

				<ThemeRegistry>
					<body className={roboto.className}>
						<NextIntlClientProvider messages={messages}>
							<Provider>{children}</Provider>
						</NextIntlClientProvider>
					</body>
				</ThemeRegistry>
			</html>
		</ClerkProvider>
	);
}
