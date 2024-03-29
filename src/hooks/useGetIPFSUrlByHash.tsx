import { CONSTANTS } from "@/constants/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import * as isIPFS from "is-ipfs";

/**
 * Hook to fetch the IPFS URL for a given hash.
 *
 * Returns a useQuery result for fetching the IPFS URL from the hash.
 * If the hash is a valid multihash, it will construct the IPFS URL and fetch
 * the data. Otherwise it returns null.
 *
 * @param options - Options passed to useQuery. Can override the hash.
 *
 * @returns A useQuery result
 */
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
				const convertedUrl = `${CONSTANTS.IPFS_URL.prod}${hash}`;
				const res = await fetch(convertedUrl);
				const data = await res.json();

				return data?.icon;
			}

			return null;
		},
		...options,
	});
}
