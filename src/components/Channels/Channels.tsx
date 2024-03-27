"use client";

import { useChannels } from "@/hooks/useChannels";
import { useMemo } from "react";
import {
	InfiniteLoader,
	List,
	type Index,
	type IndexRange,
	type ListRowProps,
} from "react-virtualized";

export function Channels() {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useChannels();

	const channels = useMemo(() => {
		return data?.pages.flatMap((page) => page.channels) ?? [];
	}, [data]);

	console.log("channels", channels);

	const rowRenderer = ({ key, index, style }: ListRowProps) => {
		return (
			<div key={key} style={style}>
				{index}
			</div>
		);
	};

	const isRowLoaded = ({ index }: Index) => {
		return !!channels[index];
	};

	const loadMoreRows = async (props: IndexRange) => {
		return await fetchNextPage();
	};

	return (
		<div>
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={loadMoreRows}
				rowCount={channels?.length}
			>
				{({ onRowsRendered, registerChild }) => (
					<List
						height={200}
						onRowsRendered={onRowsRendered}
						ref={registerChild}
						rowCount={channels?.length}
						rowHeight={20}
						rowRenderer={rowRenderer}
						width={300}
					/>
				)}
			</InfiniteLoader>
		</div>
	);
}
