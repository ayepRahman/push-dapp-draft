import { CONSTANTS } from "@/constants/constants";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import * as isIPFS from "is-ipfs";

export function useGetIPFSUrl(
	options?: UseQueryOptions<string> & {
		data: { url: string };
	},
) {
	const { data } = options || {};
	const { url } = data || {};

	return useQuery({
		queryKey: ["convertIPFSUrl", url],
		queryFn: async () => {
			const isIPFSUrl = isIPFS.urlOrPath(url || "");

			if (isIPFSUrl) {
				// for demo we using dev for

				const convertedUrl = `${
					CONSTANTS.IPFS_URL[
						process.env.NODE_ENV === "development" ? "dev" : "prod"
					]
				}${url}`;

				console.log("convertedUrl", convertedUrl);

				return convertedUrl;
			}

			return url;
		},
	});
}
