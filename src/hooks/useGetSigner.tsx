import { READONLY_WALLET } from "@/constants/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { WalletState } from "@web3-onboard/core";
import type { ethers } from "ethers";

/**
 * Hook to retrieve an Ethers.js Signer instance from the connected wallet and provider.
 *
 * Returns a signer instance from the connected provider, using the first account
 * from the connected wallet if available, otherwise falls back to a read-only signer.
 *
 * @param options - Options for configuring the query
 * @returns A signer instance from the provider
 */
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
