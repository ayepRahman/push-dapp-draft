import * as isIPFS from "is-ipfs";
import { flow, overSome } from "lodash";
import { isValidURL } from "./isValidURL";

/**
 * Strips the IPFS protocol from a URL string.
 *
 * If the URL is valid, it will remove "/ipfs/" from the pathname.
 * If it is an IPFS hash/CID, it will remove "ipfs://" or "ipfs/" from the start.
 *
 * @param url - The URL string to strip the IPFS protocol from
 * @returns The URL string without the IPFS protocol
 */
function stripIPFSProtocol(url: string) {
	if (isValidURL(url)) {
		const uri = new URL(url);
		return uri.pathname.replace("/ipfs/", "");
	}
	return url.replace("ipfs://", "").replace("ipfs/", "");
}

/**
 * Validates if a string is a valid IPFS identifier.
 *
 * Strips the IPFS protocol from the string and validates it against multiple IPFS identifier formats.
 */
export const isValidIPFS = flow([
	stripIPFSProtocol,
	overSome([
		isIPFS.multihash,
		isIPFS.cid,
		isIPFS.base32cid,
		isIPFS.cidPath,
		isIPFS.urlOrPath,
	]),
]);
