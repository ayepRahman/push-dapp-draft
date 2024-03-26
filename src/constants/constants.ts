import { ENV } from "@/config/env";

export const CONSTANTS = {
	RPC_URLS: {
		1: `https://mainnet.infura.io/v3/${ENV.INFURA_API_KEY}`,
		11155111: `https://sepolia.infura.io/v3/${ENV.INFURA_API_KEY}`,
	},
} as const;
