/**
 * status processment flow should allwais be:
 * Processing -> Analysis  - approve -> Approved -> Billing - reject -> Rejected
 *                         - reject -> Rejected             - cancel -> Canceled
 *                         - cancel -> Canceled
 */
export enum SaleStatus {
  PROCESSING = 'PROCESSING',

  ANALYSIS = 'ANALYSIS',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',

  BILLING  = 'BILLING',
  CANCELED = 'CANCELED'
}

