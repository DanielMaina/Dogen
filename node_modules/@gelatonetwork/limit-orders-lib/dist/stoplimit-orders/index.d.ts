import { ContractTransaction, BigNumberish, Overrides } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { Handler, ChainId, StopLimitOrder, TransactionData, TransactionDataWithSecret } from "../types";
import { GelatoBase } from "./core";
export declare class GelatoStopLimitOrders extends GelatoBase {
    constructor(chainId: ChainId, signerOrProvider?: Signer | Provider, handler?: Handler);
    submitStopLimitOrder(inputToken: string, outputToken: string, inputAmount: BigNumberish, maxReturn: BigNumberish, checkAllowance?: boolean, overrides?: Overrides): Promise<ContractTransaction>;
    encodeStopLimitOrderSubmission(inputToken: string, outputToken: string, inputAmount: BigNumberish, maxReturn: BigNumberish, owner: string, checkAllowance?: boolean): Promise<TransactionData>;
    encodeStopLimitOrderSubmissionWithSecret(inputToken: string, outputToken: string, inputAmount: BigNumberish, maxReturnToBeParsed: BigNumberish, owner: string, checkAllowance?: boolean): Promise<TransactionDataWithSecret>;
    getOpenStopLimitOrders(owner: string): Promise<StopLimitOrder[]>;
    getStopLimitOrders(owner: string): Promise<StopLimitOrder[]>;
    getExecutedStopLimitOrders(owner: string): Promise<StopLimitOrder[]>;
    getCancelledStopLimitOrders(owner: string): Promise<StopLimitOrder[]>;
    getPastStopLimitOrders(owner: string): Promise<StopLimitOrder[]>;
}
