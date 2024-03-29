import { cn } from "@/lib/utils";
import type { SearchToken } from "@/types/SearchToken";
import { stripIPFS } from "@/utils/stripIPFS";
import { truncate } from "@/utils/truncate";
import { Send } from "lucide-react";
import { Image } from "../Image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { mockMessages } from "./mock";

/**
 * Renders a dialog for messaging about an NFT.
 *
 * Displays NFT details like image, contract and token ID. Renders a mock list of
 * previous messages. Includes an input and button to send new messages.
 */
export function NftMessageDialog({ nft }: { nft: SearchToken }) {
	const image = stripIPFS(nft?.image || "");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="mt-auto w-full" size="sm">
					Messenger
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[800px] w-full">
				<div className="flex items-center gap-4 border-b pb-4">
					<div className="h-12 w-12 rounded-full overflow-hidden relative">
						<Image fill src={image} alt={nft.id} />
					</div>

					<div>
						<div className="text-sm font-semibold">{nft?.contract_name}</div>
						<div className="text-xs">#{truncate(nft?.token_id)}</div>
					</div>
				</div>

				<div className="flex gap-8">
					<div className="basis-10 flex flex-col gap-4">
						{Array.from({ length: 10 }).map((_, i) => {
							return (
								<Avatar className="h-8 w-8 border-[2px] border-black">
									<AvatarFallback>{i}</AvatarFallback>
								</Avatar>
							);
						})}
					</div>
					<div className=" basis-full">
						<div className="max-h-[500px] w-full overflow-y-auto space-y-4 pb-8">
							{mockMessages.map((msg) => {
								return (
									<div
										key={msg.id}
										className={cn("w-full flex", {
											"justify-start": msg.type === "sender",
											"justify-end": msg.type === "receiver",
										})}
									>
										<div
											className={cn("rounded-xl px-4 py-2 text-xs", {
												"bg-gray-100": msg.type === "sender",
												"bg-gray-900 text-white": msg.type === "receiver",
											})}
										>
											{msg.value}
										</div>
									</div>
								);
							})}
						</div>

						<div className="flex gap-2 items-center">
							<Input placeholder="Message" />
							<Send />
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
