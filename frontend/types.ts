
export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  videoQuality: string;
  resolution: string;
  screensAllowed: number;
  supportedDevices: string;
  gradient: string;
}

export enum SubscriptionStatus {
  INACTIVE = 'Inactive',
  ACTIVE = 'Active'
}
