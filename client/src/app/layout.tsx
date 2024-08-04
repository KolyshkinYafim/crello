import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.scss";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { SITE_NAME } from "@/constants/seo.constants";
import { Providers } from "@/app/providers";
import { Toaster } from "sonner";

const zen: NextFontWithVariable = Noto_Sans({
	subsets: ["cyrillic", "latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
	variable: "--font-zen",
	style: "normal"
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME} | `
	},
	description: "Trello clone"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Providers>
				<body className={zen.className}>{children}</body>
				<Toaster theme={"dark"} position={"bottom-right"} duration={1500} />
			</Providers>
		</html>
	);
}
