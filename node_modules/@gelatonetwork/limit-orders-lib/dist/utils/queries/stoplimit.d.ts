import { StopLimitOrder } from "../../types";
export declare const queryStopLimitOrders: (owner: string, chainId: number) => Promise<StopLimitOrder[]>;
export declare const queryOpenStopLimitOrders: (owner: string, chainId: number) => Promise<StopLimitOrder[]>;
export declare const queryStopLimitExecutedOrders: (owner: string, chainId: number) => Promise<StopLimitOrder[]>;
export declare const queryStopLimitCancelledOrders: (owner: string, chainId: number) => Promise<StopLimitOrder[]>;
export declare const queryPastOrders: (owner: string, chainId: number) => Promise<StopLimitOrder[]>;
export declare const _getUniqueOrdersWithExpiry: (allOrders: StopLimitOrder[]) => StopLimitOrder[];
