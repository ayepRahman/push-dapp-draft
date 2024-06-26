"use client";

import { useChannels } from "@/hooks/useChannels";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { ChannelRow } from "./ChannelRow";

/**
 * Renders the channels list view.
 *
 * Fetches channels data from the useChannels hook. Allows searching channels
 * by name. Handles loading and rendering channels with infinite scrolling.
 */
export function Channels() {
	const { data, isLoading, hasNextPage, fetchNextPage } = useChannels();
	const [value, setValue] = useState<string>("");

	/**
	 * Memoized hook that returns the list of channels.
	 *
	 * Filters channels by name if a search value is provided.
	 * Otherwise returns all channels. Depends on the channels
	 * data and search value to determine if it needs to re-run.
	 */
	const channels = useMemo(() => {
		const _channels = data?.pages.flatMap((page) => page.channels) ?? [];

		if (value) {
			return _channels.filter((channel) =>
				channel.name.toLowerCase().includes(value.toLowerCase()),
			);
		}

		return _channels;
	}, [data, value]);

	/**
	 * Renders a skeleton loader for channels with the given length.
	 *
	 * Generates a grid of skeleton placeholders to display while loading channels data.
	 */
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
		<div>
			<Input
				className="mb-8"
				placeholder="Search by name"
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>

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
		</div>
	);
}
