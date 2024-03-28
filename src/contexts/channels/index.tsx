"use client";

import { SubscriptionStatus } from "@/types/SubscriptionStatus";
import { createContext, useState } from "react";
import type { ChannelsContextProps, ChannelsProviderProps } from "./types";

export const ChannelsContext = createContext<ChannelsContextProps>({
	subscriptionStatus: {},
	setSubscriptionStatus: () => {},
	updateSubscriptionStatus: () => {},
	removeSubscriptionStatus: () => {},
});

/**
 * Provides the ChannelsContext and related state management
 *
 * The ChannelsProvider exports a React context and state management hooks for subscription statuses of channels.
 * It exposes the current subscriptionStatus, and methods to update and remove subscription statuses via the context value.
 */
export function ChannelsProvider({ children }: ChannelsProviderProps) {
	const [subscriptionStatus, setSubscriptionStatus] = useState<
		Record<string, string>
	>({});

	const updateSubscriptionStatus = ({ address }: { address: string }) => {
		setSubscriptionStatus((prev) => ({
			...prev,
			[address]: SubscriptionStatus.SUBSCRIBE,
		}));
	};

	const removeSubscriptionStatus = ({ address }: { address: string }) => {
		setSubscriptionStatus((prev) => {
			const { [address]: _, ...rest } = prev;
			return rest;
		});
	};

	return (
		<ChannelsContext.Provider
			value={{
				subscriptionStatus,
				setSubscriptionStatus,
				updateSubscriptionStatus,
				removeSubscriptionStatus,
			}}
		>
			{children}
		</ChannelsContext.Provider>
	);
}
