import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import {  Users, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EmployerDashboardPage() {
  const token = localStorage.getItem('Etoken')
  const [count, setCount] = useState<{employerId:string,applicationCount:number,jobPostedCount:number} | null>(null);
  
  useEffect(() => {

    const checkApplicationStatus = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/applications/applivationCountEmployer`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response.data1", response.data)
        setCount(response.data);
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    checkApplicationStatus();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Employer Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count?.jobPostedCount ? count.jobPostedCount : 0}</div>
            {/* <p className="text-xs text-muted-foreground">+2 from last month</p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count?.applicationCount ? count.applicationCount : 0}</div>
            {/* <p className="text-xs text-muted-foreground">+24 this week</p> */}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,345</div>
            <p className="text-xs text-muted-foreground">+$450 from last month</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
}