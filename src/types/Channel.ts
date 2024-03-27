export interface Channel {
	id: number;
	channel: string;
	ipfshash: string;
	name: string;
	info: string;
	url: string;
	icon: string;
	processed: number;
	attempts: number;
	alias_address: string;
	alias_blockchain_id: string;
	is_alias_verified: number;
	blocked: number;
	alias_verification_event?: string;
	activation_status: number;
	verified_status: number;
	subgraph_details?: string;
	counter?: number;
	timestamp: string;
	subgraph_attempts: number;
	channel_settings?: string;
	minimal_channel_settings?: string;
	itemcount: number;
	subscriber_count: number;
}
