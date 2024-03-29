"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "./constant";

/**
 * Renders the side navigation menu.
 *
 * Maps over the navItems array to generate a list of navigation links. Each link
 * checks the current pathname against its href to determine if it should be
 * highlighted as the active page. Clicking a link will push that path to the
 * router.
 */
export function SideNav() {
	const pathName = usePathname();
	const router = useRouter();

	return (
		<div className="flex flex-col gap-4 py-4">
			{navItems.map((nav) => {
				const Icon = nav.icon;
				const isActive = pathName === nav.href;

				return (
					<div
						key={nav.name}
						onClick={() => router.push(nav.href)}
						onKeyUp={() => router.push(nav.href)}
						className={cn("flex items-center gap-2 cursor-pointer", {
							"text-foreground/50": !isActive,
							"text-foreground": isActive,
						})}
					>
						<Icon />
						<div>{nav.name}</div>
					</div>
				);
			})}
		</div>
	);
}
