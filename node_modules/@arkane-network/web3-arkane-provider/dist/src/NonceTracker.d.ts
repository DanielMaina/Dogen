declare const Subprovider: any;
export declare class NonceTrackerSubprovider extends Subprovider {
    private nonceCache;
    private rpcUrl;
    constructor(opts: any);
    handleRequest(payload: any, next: any, end: any): void;
}
export {};
