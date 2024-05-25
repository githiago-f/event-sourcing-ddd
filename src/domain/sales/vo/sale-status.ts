/**
 * status processment flow should allwais be:
 * Processing - insert -> Inserted
 *                     -> Analysis  - approve -> Approved -> Billing -> reject -> Rejected
 *                                  - reject -> Rejected
 *                                  - cancel -> Canceled
 */
export enum SaleStatus {
  PROCESSING = 'PROCESSING',

  INSERTED = 'INSERTED',

  ANALYSIS = 'ANALYSIS',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',

  BILLING  = 'BILLING',
  CANCELED = 'CANCELED'
}

