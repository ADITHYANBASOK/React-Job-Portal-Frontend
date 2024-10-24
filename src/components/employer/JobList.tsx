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

// Mock data - replace with actual API call
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
    description: 'We are looking for a senior frontend developer...',
    requirements: ['5+ years of experience', 'React expertise'],
    benefits: ['Health insurance', '401k'],
    employerId: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    status: 'published',
  },
  // Add more mock jobs as needed
];

interface JobListProps {
  searchQuery: string;
}

export function JobList({ searchQuery }: JobListProps) {
  const filteredJobs = mockJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <div className="space-y-4">
      {filteredJobs.map((job) => (
        <Card key={job.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
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
                {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {job.description}
            </p>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Posted {job.createdAt.toLocaleDateString()}</span>
              <Badge
                variant={job.status === 'published' ? 'default' : 'secondary'}
              >
                {job.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}