/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { LoanDetailsV2 } from './loanDetailsV2';

export interface LoanV2 {
  /** indicates whether this loan is a long term loan */
  isLongtermLoan: boolean;
  /** indicates whether this loan can be renewed */
  isRenewable: boolean;
  loanDetails: LoanDetailsV2;
  /** if isRenewable == false then this states the reasons for denial */
  renewalStatusList: string[];
}
