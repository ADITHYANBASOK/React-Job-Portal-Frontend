import { useParams } from 'react-router-dom';
import { MapPin, Users, Building2, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Company, Job } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Mock data - replace with API calls
const mockCompany: Company = {
//     _id: '1',
//     name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop',
//     website: 'https://techcorp.example.com',
//     description: `TechCorp is a leading technology solutions provider specializing in innovative software development and digital transformation. Founded in 2010, we've grown from a small startup to a global technology leader with offices worldwide.

//   Our mission is to empower businesses through cutting-edge technology solutions that drive growth and innovation. We believe in fostering a culture of creativity, collaboration, and continuous learning.

//   We're proud to have built a diverse team of talented individuals who share our passion for technology and innovation. Our work environment promotes open communication, professional growth, and work-life balance.`,
//     industry: 'Technology',
//     size: '201-500',
//     location: 'San Francisco, CA',
//     employerId: '1',
};

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
//     createdAt: new Date('2024-03-01'),
//     updatedAt: new Date('2024-03-01'),
//     status: 'published',
//   },
//   {
//     id: '2',
//     title: 'Product Designer',
//     company: 'TechCorp',
//     location: 'San Francisco, CA',
//     type: 'full-time',
//     salary: {
//       min: 90000,
//       max: 130000,
//       currency: 'USD',
//     },
//     description: 'Join our creative team as a Product Designer...',
//     requirements: ['3+ years of experience', 'Figma expertise'],
//     benefits: ['Health insurance', 'Flexible hours'],
//     employerId: '1',
//     createdAt: new Date('2024-03-02'),
//     updatedAt: new Date('2024-03-02'),
//     status: 'published',
//   },
// ];

export function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([

  ]);
  const token = localStorage.getItem('Stoken')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/companies/singlecompany/${id}`); // Replace with your backend endpoint
        console.log("data", response.data)
        const response1 = await axios.get(`http://localhost:5000/api/jobs/Jobbycompany/${id}`); // Replace with your backend endpoint
        console.log("response34", response)
        console.log("response34q", response1.data.jobs)

        setJobs(response1.data.jobs);
        setCompany(response.data[0]); // Assuming the backend returns an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

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
        {/* Company Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <img
            src={mockCompany.logo}
            alt={company?.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{company?.name}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              {/* {console.log("company",company)} */}
              <Badge variant="secondary" className="text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                {company?.industry}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                {company?.location}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Users className="w-4 h-4 mr-2" />
                {company?.size} employees
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Globe className="w-4 h-4 mr-2" />
                <a
                  href={company?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Website
                </a>
              </Badge>
            </div>
          </div>
          <Button>Follow Company</Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="jobs">Open Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About {company?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{company?.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job._id}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <Badge variant="secondary">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {job.type}
                      </Badge>
                      <Badge variant="secondary">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </Badge>
                      <Badge variant="secondary">
                        {formatSalary(
                          job.salaryMin,
                          job.salaryMax,
                          // job.salary.currency
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {job.description}
                    </p>
                    <Link
                      key={job._id}
                      to={token ? `/seeker/jobs/${job._id}` : `/jobs/${job._id}`}
                      className="block group"
                    >
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}