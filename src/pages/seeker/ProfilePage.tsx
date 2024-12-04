import ExperienceList from '@/components/seeker/profile/ExperienceList';
import ProfileHeader from '@/components/seeker/profile/ProfileHeader';
import ProfileInfo from '@/components/seeker/profile/ProfileInfo';
import SkillsList from '@/components/seeker/profile/SkillsList';
import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';



interface ProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  phone: string;
}

export default function SeekerProfilePage() {
//   const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(
    {
    name: 'john',
    email: 'jon@gmail.com',
    bio: 'Passionate software developer with 5 years of experience in web development.',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
  }
);

  const handleProfileUpdate = (newData: ProfileData) => {
    setProfileData(newData);
    setIsEditing(false);
  };

  return (
    <div className="w-11/12 mx-auto">
      <ProfileHeader
        name={profileData.name}
        email={profileData.email}
        avatar={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
        
      />
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