export const JOB_TYPES = [
  'full-time',
  'part-time',
  'contract',
  'remote',
] as const;

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Other',
] as const;

export const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
] as const;

export const APPLICATION_STATUS = {
  pending: {
    label: 'Pending Review',
    color: 'bg-yellow-100 text-yellow-800',
  },
  reviewed: {
    label: 'Reviewed',
    color: 'bg-blue-100 text-blue-800',
  },
  shortlisted: {
    label: 'Shortlisted',
    color: 'bg-purple-100 text-purple-800',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800',
  },
  accepted: {
    label: 'Accepted',
    color: 'bg-green-100 text-green-800',
  },
};