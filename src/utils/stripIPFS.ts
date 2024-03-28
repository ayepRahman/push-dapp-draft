import { MINTABLE_INFURA_IPFS_URL } from "@/constants/constants";
import { isValidIPFS } from "./isValidIPFS";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const stripIPFS = (imageParam: any) => {
	let localImageParam = imageParam;

	if (!localImageParam) return localImageParam;

	let url = localImageParam;

	try {
		url = new URL(localImageParam);
	} catch (error) {
		if (isValidIPFS(localImageParam)) {
			const cleanUrl =
				`${MINTABLE_INFURA_IPFS_URL}/${localImageParam}/`.replace(
					/([^:]\/)\/+/g,
					"$1",
				);

			return cleanUrl;
		}
		if (!localImageParam.startsWith("ipfs")) {
			return localImageParam;
		}
	}

	if (Array.isArray(localImageParam)) {
		localImageParam = localImageParam[0];
	}

	if (
		localImageParam &&
		(localImageParam.startsWith("ipfs") || url.pathname.startsWith("/ipfs"))
	) {
		let path = localImageParam;

		if (url.protocol !== "ipfs:") {
			path = url.pathname?.slice(1);
		}

		let hash = path.replace("ipfs/", "");

		hash = hash.replace("ipfs://", "");
		hash = hash.replace("ipfs", "");

		return `${MINTABLE_INFURA_IPFS_URL}/${hash}/`.replace(/([^:]\/)\/+/g, "$1");
	}

	return localImageParam.replace(
		"a.client.sentry.bluzellenet.bluzelle.com",
		"client.sentry.bluzellenet.bluzelle.com",
	);
};
