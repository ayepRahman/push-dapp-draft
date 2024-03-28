"use client";

import { useChannelContext } from "@/hooks/useChannelContext";
import { SubscriptionStatus } from "@/types/SubscriptionStatus";
import { useConnectWallet } from "@web3-onboard/react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { OptInButtonProps } from "./types";

/**
 * Renders the opt in button for a channel.
 *
 * Handles connecting the wallet if not already connected.
 * Updates the subscription status on click if subscribed, removes
 * subscription if unsubscribed. Shows a dropdown menu if subscribed
 * to allow logging out of the subscription.
 */
export function OptInButton({ channel }: OptInButtonProps) {
	const [{ wallet, connecting }, connect] = useConnectWallet();
	const {
		subscriptionStatus,
		updateSubscriptionStatus,
		removeSubscriptionStatus,
	} = useChannelContext();

	const isSubscribed =
		subscriptionStatus?.[channel?.channel] === SubscriptionStatus.SUBSCRIBE;

	// @desc - a naive implementation without requesting user signature for demo purposes only
	const handleOnClick = async () => {
		if (!wallet) {
			const wallets = await connect();

			if (wallets?.length) {
				updateSubscriptionStatus({ address: channel?.channel });
				return;
			}
			return;
		}
		updateSubscriptionStatus({ address: channel?.channel });
	};

	return (
		<>
			{isSubscribed && !!wallet && (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant="secondary">
							<span>Manage</span>
							<ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() =>
								removeSubscriptionStatus({ address: channel?.channel })
							}
						>
							Opt-out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
			{!isSubscribed && (
				<Button isLoading={connecting} onClick={handleOnClick}>
					Opt In
				</Button>
			)}
		</>
	);
}
