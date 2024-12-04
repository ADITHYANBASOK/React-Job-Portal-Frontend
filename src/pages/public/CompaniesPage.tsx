import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { INDUSTRIES, COMPANY_SIZES } from '@/lib/constants';
import { Company } from '@/types';

// Mock data - replace with API call
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    website: 'https://techcorp.example.com',
    description: 'Leading technology solutions provider...',
    industry: 'Technology',
    size: '201-500',
    location: 'San Francisco, CA',
    employerId: '1',
  },
  {
    id: '2',
    name: 'DesignStudio',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
    website: 'https://designstudio.example.com',
    description: 'Creative design agency focused on brand identity...',
    industry: 'Technology',
    size: '11-50',
    location: 'New York, NY',
    employerId: '2',
  },
];

export function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [auth , setAuth] =useState<boolean>(true);


  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    const matchesSize = selectedSize === 'all' || company.size === selectedSize;
    return matchesSearch && matchesIndustry && matchesSize;
  });

  return (
    <div className="container mx-auto py-8 px-4 w-4/5">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore Companies</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover great places to work. Browse companies by industry, location, and size.
        </p>
      </div>

      {/* Search and Filters */}
      <div className=" mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Company Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {COMPANY_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size} employees
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Companies Grid */}
      {/* <div className='w-4/5'> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <Link
            key={company.id}
            to={auth ? `/seeker/companies/${company.id}` : `/companies/${company.id}`}
            className="block group"
          >
            <div className="border rounded-lg p-6 h-full hover:border-primary transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {company.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {company.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <MapPin className="w-3 h-3 mr-1" />
                  {company.location}
                </Badge>
                <Badge variant="secondary">
                  <Users className="w-3 h-3 mr-1" />
                  {company.size}
                </Badge>
                <Badge variant="secondary">
                  <Building2 className="w-3 h-3 mr-1" />
                  {company.industry}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      {/* </div> */}
      </div>
    </div>
  );
}