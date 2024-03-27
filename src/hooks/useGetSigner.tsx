import { READONLY_WALLET } from "@/constants/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { WalletState } from "@web3-onboard/core";
import type { ethers } from "ethers";

export function useGetSigner(
	options?: Partial<UseQueryOptions<ethers.Signer>> & {
		data: {
			provider: ethers.JsonRpcProvider | ethers.BrowserProvider | undefined;
			wallet: WalletState | null;
		};
	},
) {
	const { data } = options || {};
	const { provider, wallet } = data || {};

	return useQuery({
		queryKey: ["signer"],
		queryFn: async () => {
			return await provider?.getSigner(
				wallet?.accounts?.[0]?.address || READONLY_WALLET,
			);
		},
		enabled: !!provider,
	});
}
