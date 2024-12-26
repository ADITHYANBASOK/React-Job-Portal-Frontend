
import {  Mail, Download} from 'lucide-react';

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
  createdAt: string;

}

interface ApplicationTableProps {
  applications: Application[];
  onUpdateStatus: (id: string, status: Application['status']) => void;
}

export default function ApplicationTable({ applications, onUpdateStatus }: ApplicationTableProps) {

  const getStatusColor = (status: Application['status']) => {
    const colors = {
      pending: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      reviewing: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      shortlisted: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      rejected: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    };
    return colors[status];
  };

  const handleDownload = () => {
    const pdfPath = '/defaultCv.pdf'; // Relative to the public folder
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'defaultCv.pdf'; // Optional: specify the downloaded file name
    link.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applied</th>
              <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center text-white text-lg font-bold">
                      {application.seekerId.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{application.seekerId.name}</div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <Mail className="h-4 w-4" />
                        <span>{application.seekerId.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{application.jobId.title}</div>
                  {/* <div className="text-sm text-gray-500 dark:text-gray-400">{application.job.department}</div> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={application.status}
                    onChange={(e) => onUpdateStatus(application._id, e.target.value as Application['status'])}
                    className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full focus:outline-none ${getStatusColor(application.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(Date.parse(application.appliedAt)).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {/* {application.appliedDate?application.appliedDate:'null'} */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {/* <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900">
                      <Star className="h-4 w-4" />
                    </button> */}
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900" onClick={handleDownload}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    {/* <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-4 w-4" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
