import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JOB_TYPES } from '@/lib/constants';
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
    description: 'We are looking for an experienced frontend developer to join our team...',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern frontend tools',
    ],
    benefits: [
      'Competitive salary',
      'Remote work',
      'Health insurance',
      '401k matching',
    ],
    employerId: '1',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    status: 'published',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'full-time',
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD',
    },
    description: 'Join our creative team as a Product Designer...',
    requirements: [
      '3+ years of product design experience',
      'Proficiency in Figma',
      'Strong portfolio',
    ],
    benefits: [
      'Flexible hours',
      'Health and dental',
      'Annual learning budget',
    ],
    employerId: '2',
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-02'),
    status: 'published',
  },
];

export function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [auth , setAuth] =useState<boolean>(true);

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  const locations = Array.from(new Set(mockJobs.map((job) => job.location)));

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Your Next Job</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse through thousands of job opportunities from top companies.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="w-4/5 mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {JOB_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="w-4/5 mx-auto space-y-6">
        {filteredJobs.map((job) => (
          <Link
            key={job.id}
            to={auth?`/seeker/jobs/${job.id}`:`/jobs/${job.id}`}
            className="block group"
          >
            <div className="border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <Badge variant="secondary">
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <MapPin className="w-3 h-3 mr-1" />
                  {job.location}
                </Badge>
                <Badge variant="secondary">
                  <Building2 className="w-3 h-3 mr-1" />
                  {job.type}
                </Badge>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(job.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}