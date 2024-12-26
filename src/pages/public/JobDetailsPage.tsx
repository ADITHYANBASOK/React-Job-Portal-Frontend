import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Building2, Clock, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Job } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function JobDetailsPage() {
  const [jobs, setJobs] = useState<Job | null>(null);
  const { id } = useParams();
  console.log("id",id)
  const navigate = useNavigate();
  const token = localStorage.getItem('Stoken')
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Track if the job is saved



  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/singleuserJob/${id}`); // Replace with your backend endpoint
        console.log("data",response.data)
        setJobs(response.data); // Assuming the backend returns an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    const checkApplicationStatus = async () => {
      try {
        if (!token) return;
  
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/applications/check/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response.data",response.data)
        setIsApplied(response.data.applied);
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };
    const checkSavedStatus = async () => {
      try {
        if (!token) return;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/savedJob/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response3",response)
        setIsSaved(response.data.saved);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    fetchJobs();
    checkApplicationStatus();
    checkSavedStatus();
  }, []); 
 

  const applyForJob = async (jobId: string) => {
    try {
      if(token){
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/applications`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token for authentication
          },
        }
      );
  
      console.log(response.data.message);
      navigate('/seeker/Application-Success')
    }else{
      navigate('/login')
    }
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const saveJob = async (jobId: string) => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/savedJob`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  if (!jobs) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="text-muted-foreground">
          The job posting you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const formatSalary = (min: number, max: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      // style: 'currency',
      // currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="w-4/5 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{jobs.title}</h1>
          <div className="flex flex-wrap gap-4 items-center text-muted-foreground">
            <span className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              {jobs.company.name}
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {jobs.location}
            </span>
            <span className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              {jobs.type}
            </span>
            <span className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              {formatSalary(jobs.salaryMin, jobs.salaryMax,)}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Posted {new Date(jobs.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr,300px]">
          {/* Main Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {jobs.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  {jobs.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  {jobs.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apply Now</CardTitle>
                <CardDescription>
                  Submit your application for this position
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <Button className="w-full" size="lg" onClick={() =>{token? navigate('/seeker/Application-Success'):navigate('/login')}} */}
                <Button className="w-full" size="lg" disabled={isApplied} onClick={() => applyForJob(jobs._id)}

                >
               {isApplied ? 'Already Applied' : 'Apply for this Job'}

                </Button>
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  size="lg"
                  disabled={isSaved}
                  onClick={() => saveJob(jobs._id)}
                >
                  {isSaved ? 'Job Saved' : 'Save this Job'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">{jobs.company.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Leading technology company specializing in innovative solutions.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Technology</Badge>
                  <Badge variant="secondary">Software</Badge>
                  <Badge variant="secondary">Remote-first</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}