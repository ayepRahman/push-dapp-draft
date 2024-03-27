"use client";

import { CONSTANTS } from "@/constants/constants";
import { useGetPushAPI } from "@/hooks/useGetPushAPI";
import { useGetSigner } from "@/hooks/useGetSigner";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { createContext, useMemo } from "react";
import type {
	PushProtocolContextProps,
	PushProtocolProviderProps,
} from "./types";

export const PushProtocolContext = createContext<PushProtocolContextProps>({
	pushApi: undefined,
	provider: undefined,
	signer: undefined,
});

export function PushProtocolProvider({ children }: PushProtocolProviderProps) {
	const [{ wallet }] = useConnectWallet();

	const provider = useMemo(() => {
		return !wallet
			? new ethers.JsonRpcProvider(CONSTANTS.RPC_URLS[1])
			: new ethers.BrowserProvider(wallet?.provider);
	}, [wallet]);

	const { data: signer } = useGetSigner({
		data: { provider, wallet },
	});

	const { data: pushApi } = useGetPushAPI({
		data: { signer },
	});

	return (
		<PushProtocolContext.Provider value={{ provider, signer, pushApi }}>
			{children}
		</PushProtocolContext.Provider>
	);
}
