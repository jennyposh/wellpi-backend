/**
 * ✅ Create Pi Payment
 */
export declare const createPiPayment: ({ amount, memo, metadata, uid }: {
    amount: number;
    memo: string;
    metadata: any;
    uid: any;
}) => Promise<any>;
/**
 * ✅ Complete Pi Payment
 */
export declare const completePiPayment: (paymentId: string, txid: string) => Promise<any>;
/**
 * ✅ Cancel Pi Payment
 */
export declare const cancelPiPayment: (paymentId: string) => Promise<any>;
//# sourceMappingURL=piService.d.ts.map