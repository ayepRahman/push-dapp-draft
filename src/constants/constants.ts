import { ENV } from "@/config/env";

export const CONSTANTS = {
	RPC_URLS: {
		1: `https://mainnet.infura.io/v3/${ENV.INFURA_API_KEY}`,
		11155111: `https://sepolia.infura.io/v3/${ENV.INFURA_API_KEY}`,
	},
	IPFS_URL: {
		dev: "https://epns-testing.infura-ipfs.io/ipfs/",
		prod: "https://push.infura-ipfs.io/ipfs/",
	},
} as const;

export const READONLY_WALLET = "0x0000000000000000000000000000000000000001";
