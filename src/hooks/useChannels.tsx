import type { Channel } from "@/types/Channel";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePushProtocol } from "./usePushProtocol";

type ChannelListResponse = {
	channels: Channel[];
	itemcount: number;
};

export function useChannels() {
	const { pushApi } = usePushProtocol();

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
