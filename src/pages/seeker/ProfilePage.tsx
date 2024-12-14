import ExperienceList from '@/components/seeker/profile/ExperienceList';
import ProfileHeader from '@/components/seeker/profile/ProfileHeader';
import ProfileInfo from '@/components/seeker/profile/ProfileInfo';
import SkillsList from '@/components/seeker/profile/SkillsList';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';



interface ProfileData {
  // id: string;
  // name: string;
  // email: string;
  bio: string;
  location: string;
  phone: string;
}
interface UserData {
  id: string;
  name: string;
  email: string;
  // bio: string;
  // location: string;
  // phone: string;
}

export default function SeekerProfilePage() {
  const token = localStorage.getItem('Stoken')
  //   const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({ bio: '', location: '', phone: '' });
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/user/${token}`); // Replace with your backend endpoint
        console.log("response", response)
        setUserData(response.data)
        const response1 = await axios.get(`http://localhost:5000/api/profile/${userData?.id}`,  {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response1",response1)
        setProfileData(response1.data)
        
        // setJobs(response.data); // Assuming the backend returns an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleProfileUpdate = async (newData: ProfileData) => {
    try {
      console.log("userData.id",userData?.id)
      const response = await axios.put(`http://localhost:5000/api/profile/${userData?.id}`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response.data); // Update frontend state with backend response
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      {userData ? (
        <ProfileHeader
          name={userData.name}
          email={userData.email}
          avatar={
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        />
      ) : (
        <p>Loading user data...</p>
      )}
      <ProfileInfo
        profileData={profileData}
        isEditing={isEditing}
        onEdit={() => setIsEditing(!isEditing)}
        onUpdate={handleProfileUpdate}
      />
      <SkillsList />
      <ExperienceList />
    </div>
  );
}