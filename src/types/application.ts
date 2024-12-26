export type ApplicationStatus = 'accepted' | 'waiting' | 'ghosting' | 'rejected' | 'interviewing';

export type ApplicationMethod = 'email' | 'website' | 'linkedin' | 'referral' | 'other';

export interface Application {
  id: string;
  companyName: string;
  position: string;
  status: ApplicationStatus;
  method: ApplicationMethod;
  appliedDate: string;
  lastUpdated: string;
  notes?: string;
  contactEmail?: string;
  contactName?: string;
}