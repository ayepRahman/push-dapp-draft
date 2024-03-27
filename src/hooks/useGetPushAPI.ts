import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ethers } from "ethers";

export function useGetPushAPI(
	options?: Partial<UseQueryOptions<PushAPI>> & {
		data: { signer: ethers.JsonRpcSigner | undefined };
	},
) {
	const { data } = options || {};
	const { signer } = data || {};

	return useQuery({
		queryKey: ["pushApi"],
		queryFn: async () => {
			return await PushAPI.initialize(signer, {
				env: process.env.NODE_ENV === "development" ? ENV.DEV : ENV.PROD,
			});
		},
		enabled: !!signer,
	});
}
