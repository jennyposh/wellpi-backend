type CreateArgs = {
    amount: number;
    memo: string;
    metadata: any;
    uid: string;
};
export declare const createPiPayment: ({ amount, memo, metadata, uid }: CreateArgs) => Promise<any>;
export declare const completePiPayment: (paymentId: string, txid: string) => Promise<any>;
export declare const cancelPiPayment: (paymentId: string) => Promise<any>;
export declare const verifyPiPayment: (paymentId: string) => Promise<any>;
export {};
//# sourceMappingURL=piService.d.ts.map