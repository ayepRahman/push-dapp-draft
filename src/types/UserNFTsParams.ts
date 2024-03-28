export type UserNFTsParams = {
	searchTerm: string;
	sort?: string;
	lastKey?: number;
	size?: number;
	track_total?: boolean;
	opensea?: boolean;
	show_attributes?: boolean;
	chain?: string;
};
