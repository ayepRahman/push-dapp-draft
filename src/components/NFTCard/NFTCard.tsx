"use client";

import { Image } from "@/components/Image";
import { cn } from "@/lib/utils";
import type { SearchToken } from "@/types/SearchToken";
import { stripIPFS } from "@/utils/stripIPFS";
import { truncate } from "@/utils/truncate";
import { NftMessageDialog } from "../NftMessageDialog/NftMessageDialog";

export function NFTCard({
	className,
	nft,
}: { nft: SearchToken; className?: string }) {
	const image = stripIPFS(nft?.image || "");

	return (
		<div className={cn("border rounded-xl overflow-hidden", className)}>
			<div className="aspect-square relative rounded-xl overflow-hidden">
				<Image fill src={image} alt={nft.id} />
			</div>

			<div className="p-2 h-[136px] flex flex-col">
				<div className="text-sm font-semibold">{nft?.contract_name}</div>
				<div className="text-xs">#{truncate(nft?.token_id)}</div>
				<NftMessageDialog nft={nft} />
			</div>
		</div>
	);
}
