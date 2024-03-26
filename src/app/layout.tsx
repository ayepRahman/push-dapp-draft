import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { SideNav } from "@/components/SideNav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Push Dapp Draft",
	description: "A draft of Push Dapp",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Navbar />

					<div className="mx-auto container flex lg:gap-8">
						<SideNav />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
