import { Order } from "../../types";
export declare const queryOrder: (orderId: string, chainId: number) => Promise<Order | null>;
export declare const queryOrders: (owner: string, chainId: number) => Promise<Order[]>;
export declare const queryOpenOrders: (owner: string, chainId: number) => Promise<Order[]>;
export declare const queryPastOrders: (owner: string, chainId: number) => Promise<Order[]>;
export declare const queryExecutedOrders: (owner: string, chainId: number) => Promise<Order[]>;
export declare const queryCancelledOrders: (owner: string, chainId: number) => Promise<Order[]>;
