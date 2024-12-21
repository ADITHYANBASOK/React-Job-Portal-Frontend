import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function HomePage() {
  return (
    <div className='w-4/5'>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Find Your Dream Job Today
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover thousands of job opportunities from top companies around the world.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-10"
                />
              </div>
              <Button size="lg" asChild>
                <Link to="/jobs">Search Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Jobs
          </h2>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Top Companies
          </h2>
        </div>
      </section> */}
    </div>
  );
}