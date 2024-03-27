"use client";

// import Image from "next/image";
import { Image } from "@/components/Image";
import { useGetIPFSUrlByHash } from "@/hooks/useGetIPFSUrlByHash";
import { cn } from "@/lib/utils";
import type { Channel } from "@/types/Channel";
import { truncate } from "@/utils/truncate";
import { useConnectWallet } from "@web3-onboard/react";
import { Pill } from "../Pill";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function OptInButton() {
	const [{ wallet }, connect] = useConnectWallet();

	const handleOnClick = () => {
		if (!wallet) {
			connect();
			return;
		}
	};

	return <Button onClick={handleOnClick}>Opt In</Button>;
}

export function ChannelRow({ channel }: { channel: Channel }) {
	const { data: url, isLoading } = useGetIPFSUrlByHash({
		data: { hash: channel?.ipfshash || "" },
		enabled: !!channel?.ipfshash,
	});

	console.log("channel.alias_address", channel.alias_address);

	return (
		<div
			className={cn(
				"p-4 border rounded-xl flex items-center justify-between w-full",
			)}
		>
			<div className="flex items-center gap-2 basis-1/2 overflow-x-hidden">
				<div className=" h-20 w-20 relative border rounded-xl overflow-hidden shrink-0">
					{isLoading ? (
						<Skeleton className="h-full w-full" />
					) : (
						<Image fill src={url || ""} alt={channel.name} />
					)}
				</div>

				<div className="text-ellipsis overflow-hidden w-full">
					<div className="text-sm font-bold">{channel?.name}</div>
					<div className="text-xs">{channel?.info}</div>
					{channel?.channel && (
						<Pill
							className="mt-2"
							isCopy
							text={truncate(channel?.channel)}
							copyText={channel?.channel}
						/>
					)}
				</div>
			</div>

			<OptInButton />
		</div>
	);
}
