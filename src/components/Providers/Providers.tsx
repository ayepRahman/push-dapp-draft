"use client";

import { queryClient } from "@/config/reactQuery";
import { web3Onboard } from "@/config/web3Onboard";
import { ChannelsProvider } from "@/contexts/channels";
import { PushProtocolProvider } from "@/contexts/pushProtocol";
import { QueryClientProvider } from "@tanstack/react-query";
import { Web3OnboardProvider } from "@web3-onboard/react";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<Web3OnboardProvider web3Onboard={web3Onboard}>
				<PushProtocolProvider>
					<ChannelsProvider>{children}</ChannelsProvider>
				</PushProtocolProvider>
			</Web3OnboardProvider>
		</QueryClientProvider>
	);
}
