import { ChannelsContext } from "@/contexts/channels";
import { useContext } from "react";

/**
 * Hook to get the ChannelsContext value.
 *
 * Throws an error if used outside of a ChannelsProvider.
 *
 * @returns The ChannelsContext value
 */
export const useChannelContext = () => {
	const context = useContext(ChannelsContext);

	if (context === undefined) {
		throw new Error("useChannelContext must be used within a ChannelsProvider");
	}

	return context;
};
