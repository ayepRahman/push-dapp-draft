import Image from "next/image";
import { ConnectWalletButton } from "../ConnectWalletButton";

export function Navbar() {
	return (
		<div className="mx-auto py-4 container flex items-center justify-between">
			<Image src="/svg/push_logo.svg" height={34} width={34} alt="logo" />

			<div className="flex items-center">
				<ConnectWalletButton />
			</div>
		</div>
	);
}
