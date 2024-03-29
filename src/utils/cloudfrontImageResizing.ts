import type { ImageSizes } from "@/types/ImageSizes";

export type ValueOf<T> = T[keyof T];

/**
 * Resizes images hosted on CloudFront to a specific size if needed.
 *
 * Images are only resized if they are hosted on the appropriate CloudFront domains. The resized URL is constructed by appending
 * the size parameter to the query string. If no size is provided, the image is returned unmodified.
 *
 * @param image - The original image URL
 * @param size - The desired image size based on the ImageSizes type
 * @returns The resized image URL if applicable, otherwise the original URL
 */
export const cloudfrontImageResizing = (
	image: string,
	size: ValueOf<ImageSizes>,
): string => {
	try {
		const url = new URL(image);
		if (
			!url.hostname.includes("d1iczm3wxxz9zd") &&
			!url.hostname.includes("dgbijzg00pxv8")
		) {
			return image;
		}

		return `${url.protocol}//dgbijzg00pxv8.cloudfront.net${url.pathname}${
			url.search ? `${url.search}&` : `${size ? "?" : ""}`
		}${size ? `d=${size}` : ""}`;
	} catch (error) {
		return image;
	}
};
