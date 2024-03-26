import { ROUTES } from "@/constants/routes";
import { Compass, MessageCircleCode } from "lucide-react";

export const navItems = [
	{
		name: "Channels",
		icon: Compass,
		href: ROUTES.CHANNELS,
	},
	{
		name: "Chat",
		icon: MessageCircleCode,
		href: ROUTES.CHAT,
	},
];
