import { ConnectWalletButton } from "../ConnectWalletButton";

export function Navbar() {
	return (
		<div className="mx-auto py-4 container flex items-center justify-between">
			<div>Logo</div>

			<div className="flex items-center">
				<ConnectWalletButton />
			</div>
		</div>
	);
}
