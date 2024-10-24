export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employer' | 'seeker';
  avatar?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  employerId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'closed';
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'accepted';
  resume: string;
  coverLetter?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  employerId: string;
}