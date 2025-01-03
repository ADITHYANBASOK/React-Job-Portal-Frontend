import ApplicationFilters from "@/components/employer/Application/ApplicationFilters";
import ApplicationTable from "@/components/employer/Application/ApplicationTable";
import axios from "axios";
import { useEffect, useState } from 'react';

interface Application {
  _id: string;
  seekerId: {
    _id: string
    name: string;
    email: string;
    // phone: string;
    // avatar: string;
  };
  jobId: {
    title: string;
    _id: string;
  };
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected';
  appliedAt: string;
  // experience: string;
  createdAt:string;

}

export default function EmployerApplicationsPage() {
  const [applications,setApplications] = useState<Application[]>([
    
  ]);
  const token = localStorage.getItem('Etoken')

  const [filteredApplications, setFilteredApplications] = useState<Application[]>(applications);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    const checkApplicationStatus = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/applications/employer`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response.data1", response.data)
        setApplications(response.data);
        setFilteredApplications(response.data);
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    checkApplicationStatus();
  }, []);

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
        app.seekerId.name.toLowerCase().includes(lowercasedQuery) ||
        app.jobId.title.toLowerCase().includes(lowercasedQuery);

      return matchesStatus && matchesSearch;
    });
    setFilteredApplications(filtered);
  };

  const handleUpdateStatus = async (id: string, newStatus: Application['status']) => {
    console.log(`Updating application ${id} to status ${newStatus}`);
  
    try {
      // Get the token from localStorage
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
  
      // Send the update request to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/applications/update-status`,
        { applicationId: id, newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Status updated successfully:', response.data);
  
        // Update the applications state
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
        setFilteredApplications((prevFiltered) =>
          prevFiltered.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
      } else {
        console.error('Failed to update status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applications</h1>
      <ApplicationFilters onSearch={handleSearch} onStatusChange={handleStatusChange} />
      <div className="overflow-x-auto">
        <ApplicationTable applications={filteredApplications} onUpdateStatus={handleUpdateStatus}/>
      </div>
    </div>
  );
}
