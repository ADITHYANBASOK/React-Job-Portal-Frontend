import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react';

export default function ApplicationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-11/12 mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Application Submitted!
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Your application has been successfully submitted. We'll review it and get back to you soon.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Keep an eye on your inbox for updates about your application. We typically respond within 2-3 business days.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/seeker/jobs')}
              className="flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse More Jobs
            </button>
            
            <button
              onClick={() => navigate('/messages')}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Check Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}