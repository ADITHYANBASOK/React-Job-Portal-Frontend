import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Clock, CheckCircle, XCircle } from 'lucide-react';
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
import axios from 'axios';



export function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  // const [auth , setAuth] =useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([

  ]);
  const token = localStorage.getItem('Stoken')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/alljobs`); // Replace with your backend endpoint
        console.log("response34", response)
        setJobs(response.data); // Assuming the backend returns an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (min: number, max: number,) => {
    const formatter = new Intl.NumberFormat('en-US', {
      // style: 'currency',
      // currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === 'all' ||
      job.type?.toLowerCase().trim() === selectedType.toLowerCase().trim();

    const matchesLocation =
      selectedLocation === 'all' ||
      job.location?.toLowerCase().trim() === selectedLocation.toLowerCase().trim();

    // Log only true values
    if (matchesSearch) console.log('Search Matches:', job.title);
    if (matchesType) console.log('Type Matches:', job.type);
    if (matchesLocation) console.log('Location Matches:', job.location);

    return matchesSearch && matchesType && matchesLocation;
  });



  const locations = Array.from(new Set(jobs.map((job) => job.location)));

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
            key={job._id}
            to={token ? `/seeker/jobs/${job._id}` : `/jobs/${job._id}`}
            className="block group"
          >
            <div className="border rounded-lg p-6 hover:border-primary transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-muted-foreground">{job.company.name}</p>
                </div>
                <Badge variant="secondary">
                  {formatSalary(job.salaryMin, job.salaryMax)}

                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 whitespace-pre-line">
                {job.description.length > 100
                  ? `${job.description.slice(0, 100)}...`
                  : job.description}
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
                <Badge
                  variant={job.__v === 0 ? "default" : "destructive"}
                  className={job.__v === 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                >
                  {job.__v === 0 ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1 text-red-500" />
                      Inactive
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}