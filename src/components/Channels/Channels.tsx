"use client";

// import Image from "next/image";
import { useChannels } from "@/hooks/useChannels";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Skeleton } from "../ui/skeleton";
import { ChannelRow } from "./ChannelRow";

export function Channels() {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useChannels();

	const channels = useMemo(() => {
		return data?.pages.flatMap((page) => page.channels) ?? [];
	}, [data]);

	console.log("channels", channels);

	const renderLoader = (length: number) => (
		<div className="flex flex-col gap-4">
			{Array.from({ length }).map((_, i) => (
				<Skeleton
					className="w-full border rounded-xl h-[82px]"
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={`placeholder-${i}`}
				/>
			))}
		</div>
	);

	return (
		<InfiniteScroll
			className=" flex flex-col gap-4 overflow-y-auto"
			loadMore={() => fetchNextPage()}
			hasMore={hasNextPage}
			loader={renderLoader(3)}
		>
			{isLoading && renderLoader(10)}
			{!!channels?.length &&
				channels.map((channel, i) => {
					return <ChannelRow key={`${channel.id}-${i}`} channel={channel} />;
				})}
		</InfiniteScroll>
	);
}
