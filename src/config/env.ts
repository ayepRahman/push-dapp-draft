import type { Env } from "@/types/Env";

export const ENV: Env = {
	BLOCK_NATIVE_API_KEY: process.env.NEXT_PUBLIC_BLOCK_NATIVE_API_KEY || "",
	INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY || "",
	MINTABLE_API_URL: process.env.NEXT_PUBLIC_MINTABLE_API_URL || "",
};
