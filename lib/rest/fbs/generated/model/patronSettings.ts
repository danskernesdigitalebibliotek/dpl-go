/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { Period } from './period';

export interface PatronSettings {
  /** Required if patron should receive email notifications
 Existing email addresses are overwritten with this value
 If left empty existing email addresses are deleted */
  emailAddress?: string;
  onHold?: Period;
  /** Required if patron should receive SMS notifications
 Existing phonenumbers are overwritten with this value
 If left empty existing phonenumbers are deleted */
  phoneNumber?: string;
  /** ISIL-number of preferred pickup branch */
  preferredPickupBranch: string;
  receiveEmail: boolean;
  /** This field is deprecated and is no longer used */
  receivePostalMail: boolean;
  receiveSms: boolean;
}
