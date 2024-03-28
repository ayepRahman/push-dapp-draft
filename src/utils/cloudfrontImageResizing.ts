import type { ImageSizes } from "@/types/ImageSizes";

export type ValueOf<T> = T[keyof T];

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
