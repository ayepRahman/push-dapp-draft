"use client";

import { CONSTANTS } from "@/constants/constants";
import type { Chain, ChainWithDecimalId } from "@web3-onboard/common";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

const chains: (Chain | ChainWithDecimalId)[] = [
	{
		id: 1,
		token: "ETH",
		label: "Ethereum Mainnet",
		rpcUrl: CONSTANTS.RPC_URLS[1],
	},
	{
		id: 11155111,
		token: "sETH",
		label: "Ethereum Sepolia",
		rpcUrl: CONSTANTS.RPC_URLS[11155111],
	},
];

const injected = injectedModule?.();

const wallets = [injected];

export const web3Onboard = init({
	wallets,
	chains,
});
