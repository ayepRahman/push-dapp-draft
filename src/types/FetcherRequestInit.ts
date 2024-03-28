export interface FetcherRequestInit extends Omit<RequestInit, "body"> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data?: Record<string, any>;
	baseUrl?: string;
}
