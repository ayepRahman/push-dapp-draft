import { ROUTES } from "@/constants/routes";
import { Compass, ImagesIcon } from "lucide-react";

export const navItems = [
	{
		name: "Channels",
		icon: Compass,
		href: ROUTES.CHANNELS,
	},
	{
		name: "NFTs",
		icon: ImagesIcon,
		href: ROUTES.NFTS,
	},
];
