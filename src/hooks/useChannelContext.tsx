import { ChannelsContext } from "@/contexts/channels";
import { useContext } from "react";

export const useChannelContext = () => {
	const context = useContext(ChannelsContext);

	if (context === undefined) {
		throw new Error("useChannelContext must be used within a ChannelsProvider");
	}

	return context;
};
