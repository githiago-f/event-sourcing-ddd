/**
 * Charge should be:
 * Analysis - accept -> Approved - pay -> Paid
 *          - reject -> Rejected   
 */
export enum ChargeStatus {
    ANALYSIS = 'ANALYSIS',
    REJECTED = 'REJECTED',
    APPROVED = 'APPROVED',
    PAID = 'PAID'
}
