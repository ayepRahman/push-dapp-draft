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

/**
 * Provides the PushProtocol context and initializes the provider, signer and Push API.
 *
 * Initializes a provider from the connected wallet if available, otherwise uses a JSON RPC provider.
 * Also initializes a signer from the provider and wallet, and fetches the Push API.
 * Exposes these via the PushProtocolContext.
 */
export function PushProtocolProvider({ children }: PushProtocolProviderProps) {
	const [{ wallet }] = useConnectWallet();

	const provider = useMemo(() => {
		return !wallet
			? new ethers.JsonRpcProvider(CONSTANTS.RPC_URLS[1])
			: new ethers.BrowserProvider(wallet?.provider);
	}, [wallet]);

	const { data: signer } = useGetSigner({ data: { provider, wallet } });
	const { data: pushApi } = useGetPushAPI({ data: { wallet } });

	return (
		<PushProtocolContext.Provider value={{ provider, signer, pushApi }}>
			{children}
		</PushProtocolContext.Provider>
	);
}

/**
 * Sets the display name for this context in React Dev Tools.
 */
PushProtocolContext.displayName = "PushProtocolContext";
