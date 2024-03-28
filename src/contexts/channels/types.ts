import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

export type ChannelsContextProps = {
	subscriptionStatus: Record<string, string>;
	setSubscriptionStatus: Dispatch<SetStateAction<Record<string, string>>>;
	updateSubscriptionStatus: ({ address }: { address: string }) => void;
	removeSubscriptionStatus: ({ address }: { address: string }) => void;
};

export type ChannelsProviderProps = PropsWithChildren & {};
