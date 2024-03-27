"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type PillProps = {
	className?: string;
	isCopy?: boolean;
	text: string;
	copyText?: string;
};

export function Pill({ className, isCopy, text, copyText }: PillProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	const isShowCopyText = isHovered && isCopy && "Click to copy";
	const isShowCopiedText = isCopied && "Copied";

	const copyToClipboard = () => {
		navigator.clipboard.writeText(copyText || text);
		setTimeout(() => {
			setIsCopied(true);
			setTimeout(() => {
				setIsCopied(false);
			}, 800);
		}, 0);
	};

	return (
		<div
			onClick={() => {
				if (isCopy) {
					copyToClipboard();
				}
			}}
			onKeyUp={(e) => {
				if (e.key === "Enter" && isCopy) {
					copyToClipboard();
				}
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={cn(
				"flex w-fit py-[2px] px-[4px] border rounded-full bg-muted text-xs grow-0",
				className,
				{ "cursor-pointer": isCopy },
			)}
		>
			{isShowCopiedText || isShowCopyText || text}
		</div>
	);
}
