import type { Channel } from "@pushprotocol/restapi/src/lib/pushNotification/channel";
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
			console.log(pageParam);

			const res: ChannelListResponse = await pushApi?.channel.list({
				page: pageParam,
				limit: 10,
			});

			console.log("res", res);

			return res;
		},
		getNextPageParam: (lastPage, pages) => {
			return lastPage.channels?.length;
		},
		initialPageParam: 1,
		enabled: !!pushApi,
	});
}

// import { fetchProjects } from '@/api/project';
// import { ProjectType } from '@/schemas/ProjectType';

// export const queryKey = ['projects'];

// export function usePaginatedGetProjects(
//   options?: UseInfiniteQueryOptions<{
//     data: ProjectType[];
//     meta: {
//       count: number;
//       last_evaluated_key: string;
//     };
//   }>
// ) {
//   return useInfiniteQuery({
//     queryKey,
//     queryFn: (props) => {
//       console.log('queryFn props', props);

//       return fetchProjects();
//     },
//     getNextPageParam: (lastPage, pages) => {
//       // console.log({ lastPage, pages });
//       return lastPage.meta.last_evaluated_key;
//     },

//     ...options,
//   });
// }
