export interface SearchToken {
	current_owner: string;
	symbol: string;
	image: string;
	chain: string;
	animation_url: string;
	address: string;
	isVerified: boolean;
	description: string;
	last_offered_price: number;
	created_at: number;
	contract_name: string;
	token_uri: string;
	p_rarity: number;
	token_id: string;
	updated_at: number;
	name: string;
	attributes: {
		value: string;
		trait_type: string;
	}[];
	id: string;
	flatten_attributes: string[];
	view_count: number;
	last_purchased_price: number;
	image_compressed: string;
}
