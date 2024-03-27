import { CONSTANTS } from "@/constants/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import * as isIPFS from "is-ipfs";

export function useGetIPFSUrlByHash(
	options?: Omit<UseQueryOptions<string | null>, "queryKey"> & {
		data: { hash: string };
	},
) {
	const { data } = options || {};
	const { hash } = data || {};

	return useQuery({
		queryKey: ["convertIPFSUrl", hash],
		queryFn: async () => {
			if (isIPFS.multihash(hash || "")) {
				const env = process.env.NODE_ENV === "development" ? "dev" : "prod";
				const convertedUrl = `${CONSTANTS.IPFS_URL.prod}${hash}`;
				console.log("convertedUrl", convertedUrl);

				const res = await fetch(convertedUrl);
				const data = await res.json();

				return data?.icon;
			}

			return null;
		},
		...options,
	});
}
