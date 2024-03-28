import * as isIPFS from "is-ipfs";
import { flow, overSome } from "lodash";
import { isValidURL } from "./isValidURL";

function stripIPFSProtocol(url: string) {
	if (isValidURL(url)) {
		const uri = new URL(url);
		return uri.pathname.replace("/ipfs/", "");
	}
	return url.replace("ipfs://", "").replace("ipfs/", "");
}

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
