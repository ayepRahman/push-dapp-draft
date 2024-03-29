import { ENV } from "@/config/env";
import type { SearchTokensResponse } from "@/types/SearchTokensResponse";
import type { UserNFTsParams } from "@/types/UserNFTsParams";
import type { UserNFTsRes } from "@/types/UserNFTsRes";

/**
 * Fetch NFTs owned by a user from the Mintable API.
 *
 * @param data - Parameters for searching NFTs by owner
 * @returns An object containing search results from the Mintable API
 */
export async function getUserNFTs(data: UserNFTsParams): Promise<UserNFTsRes> {
	const res = await fetch(`${ENV.MINTABLE_API_URL}/tokens/search?network=1`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	const resData: SearchTokensResponse = await res.json();

	return {
		total: resData.total,
		max_score: resData.max_score,
		data: resData.hits.map((hit) => hit._source),
	};
}
