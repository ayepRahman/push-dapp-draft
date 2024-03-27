import type { PushAPI } from "@pushprotocol/restapi";
import type { BrowserProvider, JsonRpcProvider, ethers } from "ethers";
import type { PropsWithChildren } from "react";

export type PushProtocolContextProps = {
	provider: JsonRpcProvider | BrowserProvider | undefined;
	signer: ethers.Signer | undefined;
	pushApi: PushAPI | undefined;
};

export type PushProtocolProviderProps = PropsWithChildren & {};
