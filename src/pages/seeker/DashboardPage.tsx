import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import {  Star, Send  } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SeekerDashboardPage() {
  
  const token = localStorage.getItem('Stoken')
    const [count, setCount] = useState<{seekerId:string,applicationCount:number,savedJobCount:number} | null>(null);
  
  useEffect(() => {

    const checkApplicationStatus = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/applications/applivationCount`,
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
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <Link to={"/seeker/applications"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count?.applicationCount?count?.applicationCount:0}</div>
            {/* <p className="text-xs text-muted-foreground">+4 this week</p> */}
          </CardContent>
          </Link>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count?.savedJobCount?count?.savedJobCount:0}</div>
            {/* <p className="text-xs text-muted-foreground">+12 this week</p> */}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+14 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Invites</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 this week</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
}