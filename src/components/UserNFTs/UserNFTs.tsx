"use client";

import { Image } from "@/components/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PLACEHOLDER_BANNER, READONLY_WALLET } from "@/constants/constants";
import { useGetUserNFTs } from "@/hooks/useGetUserNFTs";
import { truncate } from "@/utils/truncate";
import { useConnectWallet } from "@web3-onboard/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { v4 as uuidv4 } from "uuid";
import { NFTCard } from "../NFTCard/NFTCard";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

/**
 * Renders the user's NFT collection. Retrieves NFT data from mintable API using
 * the user's wallet address. Allows infinite scrolling to load more NFT pages.
 */
export function UserNFTs() {
	const [{ wallet, connecting }, connect] = useConnectWallet();

	const address = wallet?.accounts[0]?.address;
	const ensName = wallet?.accounts[0]?.ens?.name;
	const avatar = wallet?.accounts[0]?.ens?.avatar?.url;

	const { data, isLoading, fetchNextPage, hasNextPage } = useGetUserNFTs({
		data: { searchTerm: address || "" },
	});

	/**
	 * Memoizes the flattened list of NFTs from all pages
	 * to improve performance.
	 */ const nfts = useMemo(() => {
		return data?.pages.flatMap((page) => page.data);
	}, [data]);

	const renderLoader = (length: number) => (
		<>
			{Array.from({ length }).map((_, i) => (
				<Skeleton
					className="col-span-1 aspect-square"
					key={`placeholder-${uuidv4()}`}
				/>
			))}
		</>
	);

	return (
		<div className="relative h-full w-full">
			{!wallet && (
				<div className="z-10 absolute inset-0 backdrop-blur-sm flex flex-col justify-center">
					<Button
						isLoading={connecting}
						onClick={() => connect()}
						className="grow-0 w-fit mx-auto"
					>
						Connect Wallet to View NFTs
					</Button>
				</div>
			)}

			<div className="h-[160px] w-full relative z-0">
				<Image
					fill
					src={avatar || PLACEHOLDER_BANNER}
					alt="placeholder-banner"
				/>

				<Avatar className="absolute left-4 h-32 w-32 -bottom-8 z-10 shadow-2xl border-[2px] border-black">
					<AvatarImage src="https://api.time.com/wp-content/uploads/2020/09/vitalik-buterin-time-100-2021.jpg" />
					<AvatarFallback>VT</AvatarFallback>
				</Avatar>
			</div>

			<div className="p-4 mt-8">
				<div className="">
					{ensName && <div className="text-xl font-semibold">{ensName}</div>}

					<div className="text-sm">{truncate(address || READONLY_WALLET)}</div>
				</div>
			</div>

			<InfiniteScroll
				className=" grid grid-cols-5 gap-4 p-4"
				loadMore={() => fetchNextPage()}
				hasMore={hasNextPage}
				loader={renderLoader(5)}
			>
				{!wallet && renderLoader(20)}
				{isLoading && renderLoader(10)}
				{!!nfts?.length &&
					nfts.map((nft, i) => {
						return (
							<NFTCard
								key={`nft-${uuidv4()}`}
								className="col-span-1"
								nft={nft}
							/>
						);
					})}
			</InfiniteScroll>
		</div>
	);
}
