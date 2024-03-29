import { PushProtocolContext } from "@/contexts/pushProtocol";
import { useContext } from "react";

/**
 * Hook to get the PushProtocolContext from React context.
 *
 * Throws an error if not used within a PushProtocolProvider.
 *
 * @returns {PushProtocolContext} - The PushProtocolContext value
 */
export const usePushProtocolContext = () => {
	const context = useContext(PushProtocolContext);

	if (context === undefined) {
		throw new Error(
			"usePushProtocolContext must be used within a PushProtocolProvider",
		);
	}

	return context;
};
