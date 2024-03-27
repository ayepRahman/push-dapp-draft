import { PushProtocolContext } from "@/contexts/pushProtocol";
import { useContext } from "react";

export const usePushProtocol = () => {
	const context = useContext(PushProtocolContext);

	if (context === undefined) {
		throw new Error(
			"usePushProtocol must be used within a PushProtocolProvider",
		);
	}

	return context;
};
