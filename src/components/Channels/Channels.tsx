"use client";

import { useChannels } from "@/hooks/useChannels";
import { cn } from "@/lib/utils";
import type { Channel } from "@/types/Channel";
import Image from "next/image";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import type { Index, IndexRange, ListRowProps } from "react-virtualized";

export function ChannelRow({ channel }: { channel: Channel }) {
	console.log(channel.icon);

	return (
		<div
			className={cn(
				"p-4 border rounded-xl flex items-center justify-between w-full",
			)}
		>
			<div className="flex items-center gap-2">
				<div className="h-12 w-12 relative border rounded-xl overflow-hidden">
					<Image fill src={channel.icon} alt={channel.name} />
				</div>
			</div>

			<div>opt-in</div>
		</div>
	);
}

export function Channels() {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useChannels();

	const channels = useMemo(() => {
		return data?.pages.flatMap((page) => page.channels) ?? [];
	}, [data]);

	console.log("channels", channels);

	const rowRenderer = ({ key, index, style }: ListRowProps) => {
		return <div key={key}>{channels?.[index]?.info}</div>;
	};

	const isRowLoaded = ({ index }: Index) => {
		return !!channels[index];
	};

	const loadMoreRows = async (props: IndexRange) => {
		return await fetchNextPage();
	};

	return (
		<div>
			<InfiniteScroll
				className="flex flex-col gap-4"
				// pageStart={0}
				loadMore={() => fetchNextPage()}
				hasMore={hasNextPage}
				loader={
					<div className="loader" key={0}>
						Loading ...
					</div>
				}
			>
				{!!channels?.length &&
					channels.map((channel) => {
						return <ChannelRow channel={channel} />;
					})}
			</InfiniteScroll>
		</div>
	);
}
