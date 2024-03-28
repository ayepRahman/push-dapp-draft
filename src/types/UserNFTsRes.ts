import type { SearchToken } from "./SearchToken";

export interface UserNFTsRes {
	total: {
		value: number;
		relation: string;
	};
	max_score: number;
	data: SearchToken[];
}
