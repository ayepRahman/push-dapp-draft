import { getUserNFTs } from "@/api/getUserNFTs";
import type { UserNFTsParams } from "@/types/UserNFTsParams";
import { useInfiniteQuery } from "@tanstack/react-query";
import { sumBy } from "lodash";

export function useGetUserNFTs(options?: {
	data: UserNFTsParams;
	initialPageParam?: number | undefined;
}) {
	const data: UserNFTsParams = {
		searchTerm: options?.data?.searchTerm || "",
		size: 10,
		show_attributes: true,
		chain: "eth",
		...(options?.data || {}),
	};

	return useInfiniteQuery({
		queryKey: ["getUserNFTs", data],
		queryFn: async ({ pageParam = 0 }) => {
			const res = await getUserNFTs({ ...data, lastKey: pageParam as number });
			return res;
		},
		initialPageParam: options?.initialPageParam || 0,
		getNextPageParam: (lastPage, allPages) => {
			const dataLength = sumBy(allPages, (page) => page.data.length);
			return dataLength < lastPage.total.value ? dataLength : undefined;
		},
		enabled: !!data?.searchTerm,
	});
}
