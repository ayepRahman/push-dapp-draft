"use client";

import { truncate } from "@/utils/truncate";
import { useConnectWallet } from "@web3-onboard/react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function ConnectWalletButton() {
	const [{ connecting, wallet }, connect, disconnect] = useConnectWallet();

	const currentAccount = wallet?.accounts[0];
	const walletAddress = currentAccount?.address || "";
	const ensName = currentAccount?.ens?.name;

	return (
		<>
			{wallet && (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button>{ensName || truncate(walletAddress)}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => disconnect(wallet)}>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
			{!wallet && (
				<Button isLoading={connecting} onClick={() => connect()}>
					Connect Wallet
				</Button>
			)}
		</>
	);
}
