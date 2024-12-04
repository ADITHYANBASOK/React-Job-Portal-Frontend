import ApplicationFilters from "@/components/employer/Application/ApplicationFilters";
import ApplicationTable from "@/components/employer/Application/ApplicationTable";
import { useState } from 'react';

interface Application {
  id: string;
  candidate: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  job: {
    title: string;
    department: string;
  };
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected';
  appliedDate: string;
  experience: string;
}

export default function EmployerApplicationsPage() {
  const [applications] = useState<Application[]>([
    {
      id: '1',
      candidate: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      job: {
        title: 'Senior Frontend Developer',
        department: 'Engineering',
      },
      status: 'reviewing',
      appliedDate: '2024-03-15',
      experience: '5 years',
    },
    {
      id: '2',
      candidate: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '+1 (555) 987-6543',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      job: {
        title: 'Frontend Developer',
        department: 'Engineering',
      },
      status: 'shortlisted',
      appliedDate: '2024-03-14',
      experience: '3 years',
    },
  ]);

  const [filteredApplications, setFilteredApplications] = useState<Application[]>(applications);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterApplications(query, statusFilter);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    filterApplications(searchQuery, status);
  };

  const filterApplications = (query: string, status: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = applications.filter((app) => {
      const matchesStatus = status === 'all' || app.status === status;
      const matchesSearch =
        app.candidate.name.toLowerCase().includes(lowercasedQuery) ||
        app.job.title.toLowerCase().includes(lowercasedQuery);

      return matchesStatus && matchesSearch;
    });
    setFilteredApplications(filtered);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applications</h1>
      <ApplicationFilters onSearch={handleSearch} onStatusChange={handleStatusChange} />
      <div className="overflow-x-auto">
        <ApplicationTable applications={filteredApplications} />
      </div>
    </div>
  );
}
