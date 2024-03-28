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
export const PLACEHOLDER_BANNER =
	"https://www.myrelatedlife.com/app/uploads/2022/01/NFT-1-copy-1196x445-1300x445-c-default-1300x445-c-default.jpg";
export const MINTABLE_INFURA_IPFS_URL = "https://mintable.infura-ipfs.io/ipfs";
