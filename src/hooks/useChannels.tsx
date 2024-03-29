import type { ChannelListResponse } from "@/types/ChannelListResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePushProtocolContext } from "./usePushProtocolContext";

/**
 * Returns an infinite query hook for fetching channels from the Push API.
 *
 * The query fetches channels paginated in pages of 10. It will refetch
 * when the next page parameter changes after reaching the end of the
 * previous page.
 */
export function useChannels() {
	const { pushApi } = usePushProtocolContext();

	return useInfiniteQuery({
		queryKey: ["channels"],
		queryFn: async ({ pageParam }) => {
			const res: ChannelListResponse = await pushApi?.channel.list({
				page: pageParam,
				limit: 10,
			});
			return res;
		},
		getNextPageParam: (lastPage, pages) => {
			return lastPage.channels?.length;
		},
		initialPageParam: 1,
		enabled: !!pushApi,
	});
}
