import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const PLACEHOLDER_SRC =
	"https://i0.wp.com/sigmamaleimage.com/wp-content/uploads/2023/03/placeholder-1-1.png?ssl=1";

type ImageProps = NextImageProps & {
	className?: string;
	src: string;
};

/**
 * Renders an image with loading and error states.
 *
 * Handles loading and error states by tracking booleans in state.
 * Renders a placeholder image on error.
 */
export function Image({
	src,
	alt,
	width,
	height,
	className,
	...props
}: ImageProps) {
	const [isLoading, setLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const handleLoad = () => setLoading(false);
	const handleError = () => {
		setLoading(false);
		setHasError(true);
	};

	return (
		<div>
			{isLoading && <Skeleton className={className} />}{" "}
			{/* Adjust Skeleton properties as needed */}
			{!hasError ? (
				<NextImage
					className={className}
					src={src}
					alt={alt}
					onLoadedData={handleLoad}
					onError={handleError}
					{...props}
				/>
			) : (
				<NextImage
					className={className}
					src={PLACEHOLDER_SRC}
					alt="Placeholder"
					{...props}
				/>
			)}
		</div>
	);
}
