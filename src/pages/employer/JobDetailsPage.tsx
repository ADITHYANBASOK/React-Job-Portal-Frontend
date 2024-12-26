import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Users, Building } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Job } from '@/types';

export default function EmployerJobDetailsPage() {
  const [jobs, setJobs] = useState<Job | null>(null);
  const { id } = useParams();
  console.log("id",id)
  const navigate = useNavigate();
  const token = localStorage.getItem('Etoken')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/singleJob/${token}/${id}`); // Replace with your backend endpoint
        console.log("data",response.data)
        setJobs(response.data); // Assuming the backend returns an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []); 


  // Mock job data - in a real app, fetch based on id
  const job = {
    // id,
    // title: 'Senior Frontend Developer',
    // company: 'TechCorp Solutions',
    // location: 'San Francisco, CA',
    // salary: '$120,000 - $160,000',
    // type: 'Full-time',
    // level: 'Senior',
    postedAt: '2d ago',
    // description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
    // requirements: [
    //   'Minimum 5 years of experience with React',
    //   'Strong understanding of modern JavaScript',
    //   'Experience with TypeScript',
    //   'Excellent problem-solving skills'
    // ],
    applications: 12,
    status: 'Active'
  };

  if (!jobs) {
    // Show a loading state while the job data is being fetched
    return (
      <div className="w-11/12 mx-auto text-center text-gray-600 dark:text-gray-400">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Jobs
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {jobs.title}
              </h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  {jobs.company.name}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {jobs.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  {jobs.salaryMax}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                {job.status}
              </span>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                Posted {job.postedAt}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Applications</span>
                <Users className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{job.applications}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Job Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {jobs.description}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Requirements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              {jobs.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}