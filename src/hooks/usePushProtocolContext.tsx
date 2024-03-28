import { PushProtocolContext } from "@/contexts/pushProtocol";
import { useContext } from "react";

export const usePushProtocolContext = () => {
	const context = useContext(PushProtocolContext);

	if (context === undefined) {
		throw new Error(
			"usePushProtocolContext must be used within a PushProtocolProvider",
		);
	}

	return context;
};
