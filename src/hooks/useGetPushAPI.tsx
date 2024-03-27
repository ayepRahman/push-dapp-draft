import { READONLY_WALLET } from "@/constants/constants";
import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { WalletState } from "@web3-onboard/core";

export function useGetPushAPI(
	options?: Partial<UseQueryOptions<PushAPI>> & {
		data: { wallet: WalletState | null };
	},
) {
	const { data } = options || {};
	const { wallet } = data || {};

	return useQuery({
		queryKey: ["pushApi"],
		queryFn: async () => {
			return await PushAPI.initialize({
				account: wallet?.accounts?.[0]?.address || READONLY_WALLET,
				env: process.env.NODE_ENV === "development" ? ENV.DEV : ENV.PROD,
				alpha: { feature: ["SCALABILITY_V2"] },
			});
		},
	});
}
