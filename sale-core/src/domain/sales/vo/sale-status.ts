/**
 * status processment flow should allwais be:
 * Processing - on first charge inserted -> Billing - reject -> Rejected
 *           * - cancel -> Canceled
 */
export enum SaleStatus {
  PROCESSING = 'PROCESSING',
  BILLING  = 'BILLING',

  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED'
}

