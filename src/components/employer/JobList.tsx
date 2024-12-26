// import { Job } from '@/types';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';

// // Mock data - replace with actual API call
// const mockJobs: Job[] = [
//   {
//     id: '1',
//     title: 'Senior Frontend Developer',
//     company: 'TechCorp',
//     location: 'Remote',
//     type: 'full-time',
//     salary: {
//       min: 100000,
//       max: 150000,
//       currency: 'USD',
//     },
//     description: 'We are looking for a senior frontend developer...',
//     requirements: ['5+ years of experience', 'React expertise'],
//     benefits: ['Health insurance', '401k'],
//     employerId: '1',
//     createdAt: new Date('2024-01-01'),
//     updatedAt: new Date('2024-01-01'),
//     status: 'published',
//   },
//   // Add more mock jobs as needed
// ];

// interface JobListProps {
//   searchQuery: string;
// }

// export function JobList({ searchQuery }: JobListProps) {
//   const filteredJobs = mockJobs.filter((job) =>
//     job.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const formatSalary = (min: number, max: number, currency: string) => {
//     const formatter = new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency,
//       maximumFractionDigits: 0,
//     });
//     return `${formatter.format(min)} - ${formatter.format(max)}`;
//   };

//   return (
//     <div className="space-y-4">
//       {filteredJobs.map((job) => (
//         <Card key={job.id}>
//           <CardHeader className="flex flex-row items-start justify-between space-y-0">
//             <div>
//               <CardTitle>{job.title}</CardTitle>
//               <CardDescription>{job.company}</CardDescription>
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <MoreVertical className="w-4 h-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>
//                   <Eye className="w-4 h-4 mr-2" />
//                   View
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Pencil className="w-4 h-4 mr-2" />
//                   Edit
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="text-destructive">
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <Badge variant="secondary">{job.type}</Badge>
//               <Badge variant="secondary">{job.location}</Badge>
//               <Badge variant="secondary">
//                 {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
//               </Badge>
//             </div>
//             <p className="text-sm text-muted-foreground line-clamp-2">
//               {job.description}
//             </p>
//             <div className="flex justify-between items-center text-sm text-muted-foreground">
//               <span>Posted {job.createdAt.toLocaleDateString()}</span>
//               <Badge
//                 variant={job.status === 'published' ? 'default' : 'secondary'}
//               >
//                 {job.status}
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';
import { EditJobDialog } from './EditJobDialog';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



interface Company {
  _id: string;
  employerId: string;
  name: string;
  description: string;
  industry: string;
  website: string;
  location: string;
  size: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Jobs {
  _id: string;
  employerId: string;
  title: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  location: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string[];
  benefits: string[];
  createdAt: string;
  __v: number;
  company: Company; // Embedded company object
}




interface JobListProps {
  searchQuery: string;
}

export function JobList({ searchQuery }: JobListProps) {
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Jobs | null>(null); // State for the selected job
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([

  ]);
  const token = localStorage.getItem('Etoken')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/employerjobs/${token}`); // Replace with your backend endpoint
        console.log(response)
        setJobs(response.data); // Assuming the backend returns an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);


  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const formatSalary = (min: number, max: number, currency: string) => {
  //   const formatter = new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency,
  //     maximumFractionDigits: 0,
  //   });
  //   return `${formatter.format(min)} - ${formatter.format(max)}`;
  // };

  const handleEditJob = (job: Jobs) => {
    setSelectedJob(job); // Set the selected job for editing
    setIsDialogOpen(true); // Open the dialog
  };

  const handleView = (jobId: string) => {
    navigate(`/employer/jobs/${jobId}`);
  };
  const handleDelete = (jobId: string) => {
    setJobs(jobs.filter(job => job._id !== jobId));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-4">
      {filteredJobs.map((job) => (
        <Card key={job._id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.company.name}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleView(job._id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEditJob(job)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteConfirm(job._id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{job.type}</Badge>
              <Badge variant="secondary">{job.location}</Badge>
              <Badge variant="secondary">
                {/* {formatSalary(job.salaryMin, job.salaryMax)} */}{job.salaryMin} - {job.salaryMax}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 whitespace-pre-line">
              {job.description.length > 100
                ? `${job.description.slice(0, 100)}...`
                : job.description}
            </p>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span> Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</span>
              <Badge
              // variant={job.status === 'published' ? 'default' : 'secondary'}
              >
                {/* {job.status} */}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Edit Job Dialog */}
      {selectedJob && (
        <EditJobDialog
          job={selectedJob}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowDeleteConfirm(null)}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Delete Job Posting
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this job posting? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDelete(showDeleteConfirm)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>


  );
}
