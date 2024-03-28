import type { SearchToken } from "./SearchToken";

export type SearchTokensResponse = {
	total: {
		value: number;
		relation: string;
	};
	max_score: number;
	hits: {
		_source: SearchToken;
	}[];
};
