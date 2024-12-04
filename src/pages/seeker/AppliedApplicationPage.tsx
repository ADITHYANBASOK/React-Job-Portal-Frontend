
interface AppliedJob {
  id: string;
  title: string;
  company: string;
  department: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected';
}

const appliedJobs: AppliedJob[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    department: 'Engineering',
    appliedDate: '2024-11-10',
    status: 'shortlisted',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'CodeWorks',
    department: 'Development',
    appliedDate: '2024-11-08',
    status: 'reviewing',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Designify',
    department: 'Creative',
    appliedDate: '2024-11-05',
    status: 'pending',
  },
];

export default function JobSeekerDashboard() {
  const getStatusBadge = (status: AppliedJob['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  return (
    <div className="min-h-screen bg-gray dark:bg-gray-1000 py-8 px-4 lg:px-8">
      <div className="w-full mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          My Applications
        </h1>

        <div className="space-y-4">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-start justify-between"
            >
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {job.company} - {job.department}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Applied on: {new Date(job.appliedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                    job.status
                  )}`}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
