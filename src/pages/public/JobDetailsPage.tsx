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

// Mock data - replace with API call
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'full-time',
    salary: {
      min: 100000,
      max: 150000,
      currency: 'USD',
    },
    description: `We are seeking a Senior Frontend Developer to join our dynamic team. The ideal candidate will have a strong foundation in modern web technologies and a passion for creating exceptional user experiences.

Key Responsibilities:
- Lead frontend development initiatives and mentor junior developers
- Architect and implement scalable frontend solutions
- Collaborate with designers and backend developers
- Optimize application performance and ensure cross-browser compatibility
- Participate in code reviews and maintain coding standards`,
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern frontend tools',
      'Excellent problem-solving abilities',
      'Strong communication skills',
    ],
    benefits: [
      'Competitive salary',
      'Remote work',
      'Health insurance',
      '401k matching',
      'Flexible vacation policy',
      'Professional development budget',
    ],
    employerId: '1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    status: 'published',
  },
];

export function JobDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="text-muted-foreground">
          The job posting you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="w-4/5 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 items-center text-muted-foreground">
            <span className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              {job.company}
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {job.location}
            </span>
            <span className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              {job.type}
            </span>
            <span className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Posted {new Date(job.createdAt).toLocaleDateString()}
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
                  {job.description.split('\n').map((paragraph, index) => (
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
                  {job.requirements.map((requirement, index) => (
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
                  {job.benefits.map((benefit, index) => (
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
                <Button className="w-full" size="lg" onClick={() => navigate('/seeker/Application-Success')}
                >
                  Apply for this Job
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">{job.company}</h4>
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