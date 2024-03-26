"use client";

import { web3Onboard } from "@/config/web3Onboard";
import { Web3OnboardProvider } from "@web3-onboard/react";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
	return (
		<Web3OnboardProvider web3Onboard={web3Onboard}>
			{children}
		</Web3OnboardProvider>
	);
}
