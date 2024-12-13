// import  { useState } from 'react';
// import { Building, Mail, Phone, MapPin, Camera } from 'lucide-react';

// interface CompanyProfile {
//   name: string;
//   description: string;
//   industry: string;
//   website: string;
//   location: string;
//   size: string;
//   email: string;
//   phone: string;
// }

// export default function EmployerProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<CompanyProfile>({
//     name: 'TechCorp Solutions',
//     description: 'Leading technology solutions provider specializing in enterprise software development and digital transformation.',
//     industry: 'Information Technology',
//     website: 'www.techcorp.com',
//     location: 'San Francisco, CA',
//     size: '100-500 employees',
//     email: 'contact@techcorp.com',
//     phone: '+1 (555) 123-4567'
//   });

//   const handleSave = () => {
//     setIsEditing(false);
//     // Handle save logic here
//   };

//   return (
//     <div className="w-11/12 mx-auto space-y-6">
//       {/* Company Header */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
//         <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-indigo-500 to-purple-600">
//           <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30">
//             <Camera className="h-5 w-5" />
//           </button>
//         </div>
//         <div className="px-6 pb-6">
//           <div className="flex justify-between items-end -mt-12">
//             <div className="relative">
//               <div className="h-24 w-24 rounded-lg bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center">
//                 <Building className="h-12 w-12 text-gray-400" />
//               </div>
//             </div>
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//             >
//               {isEditing ? 'Save Changes' : 'Edit Profile'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Company Information */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Company Name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={profile.name}
//                 onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                 className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             ) : (
//               <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
//                 {profile.name}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Description
//             </label>
//             {isEditing ? (
//               <textarea
//                 value={profile.description}
//                 onChange={(e) => setProfile({ ...profile, description: e.target.value })}
//                 rows={4}
//                 className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             ) : (
//               <p className="mt-1 text-gray-600 dark:text-gray-400">
//                 {profile.description}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Industry
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profile.industry}
//                   onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 />
//               ) : (
//                 <p className="mt-1 text-gray-600 dark:text-gray-400 flex items-center">
//                   <Building className="h-5 w-5 mr-2" />
//                   {profile.industry}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Company Size
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profile.size}
//                   onChange={(e) => setProfile({ ...profile, size: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 />
//               ) : (
//                 <p className="mt-1 text-gray-600 dark:text-gray-400">
//                   {profile.size}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Location
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profile.location}
//                   onChange={(e) => setProfile({ ...profile, location: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 />
//               ) : (
//                 <p className="mt-1 text-gray-600 dark:text-gray-400 flex items-center">
//                   <MapPin className="h-5 w-5 mr-2" />
//                   {profile.location}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Contact Email
//               </label>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   value={profile.email}
//                   onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                   className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 />
//               ) : (
//                 <p className="mt-1 text-gray-600 dark:text-gray-400 flex items-center">
//                   <Mail className="h-5 w-5 mr-2" />
//                   {profile.email}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import { useState } from 'react';
// import { Building, Mail, Phone, MapPin, Camera } from 'lucide-react';


// interface CompanyProfile {
//   name: string;
//   description: string;
//   industry: string;
//   website: string;
//   location: string;
//   size: string;
//   email: string;
//   phone: string;
// }

// export default function EmployerProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<CompanyProfile | null>(null);

//   const handleSave = () => {
//     setIsEditing(false);
//     // TODO: Implement save logic here, such as API call to update profile data
//   };

//   const handleAddProfile = () => {
//     setProfile({
//       name: '',
//       description: '',
//       industry: '',
//       website: '',
//       location: '',
//       size: '',
//       email: '',
//       phone: '',
//     });
//     setIsEditing(true);
//   };

//   return (
//     <div className="w-11/12 mx-auto space-y-6">
//       {/* Company Header */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
//         <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-indigo-500 to-purple-600">
//           <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30">
//             <Camera className="h-5 w-5" />
//           </button>
//         </div>
//         <div className="px-6 pb-6">
//           <div className="flex justify-between items-end -mt-12">
//             <div className="relative">
//               <div className="h-24 w-24 rounded-lg bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center">
//                 <Building className="h-12 w-12 text-gray-400" />
//               </div>
//             </div>
//             {!profile ? (
//               <button
//                 onClick={handleAddProfile}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//               >
//                 Add Profile
//               </button>
//             ) : (
//               <button
//                 onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 {isEditing ? 'Save Changes' : 'Edit Profile'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Company Information */}
//       {profile && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <div className="space-y-6">
//             {[
//               { label: 'Company Name', field: 'name' },
//               { label: 'Description', field: 'description', multiline: true },
//               { label: 'Industry', field: 'industry' },
//               { label: 'Website', field: 'website' },
//               { label: 'Location', field: 'location', icon: <MapPin className="h-5 w-5 mr-2" /> },
//               { label: 'Company Size', field: 'size' },
//               { label: 'Contact Email', field: 'email', icon: <Mail className="h-5 w-5 mr-2" /> },
//               { label: 'Contact Phone', field: 'phone', icon: <Phone className="h-5 w-5 mr-2" /> },
//             ].map(({ label, field, multiline, icon }) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   {label}
//                 </label>
//                 {isEditing ? (
//                   multiline ? (
//                     <textarea
//                       value={(profile as any)[field]}
//                       onChange={(e) =>
//                         setProfile({ ...profile, [field]: e.target.value })
//                       }
//                       rows={4}
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                   ) : (
//                     <input
//                       type={field === 'email' ? 'email' : 'text'}
//                       value={(profile as any)[field]}
//                       onChange={(e) =>
//                         setProfile({ ...profile, [field]: e.target.value })
//                       }
//                       className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                     />
//                   )
//                 ) : (
//                   <p className="mt-1 text-gray-600 dark:text-gray-400 flex items-center">
//                     {icon}
//                     {(profile as any)[field]}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








import { useState, useEffect } from 'react';
import { Building, Mail, Phone, MapPin, Camera } from 'lucide-react';
import API from '@/Services/api';

interface CompanyProfile {
  id?: string;
  name: string;
  description: string;
  industry: string;
  website: string;
  location: string;
  size: string;
  email: string;
  phone: string;
}

export default function EmployerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [status, setStatus]=useState(false)
  const token = localStorage.getItem('Etoken')

  // Fields array to dynamically generate form fields
  const fields = [
    { label: 'Name', field: 'name', multiline: false, icon: <Building className="h-5 w-5 mr-2" /> },
    { label: 'Description', field: 'description', multiline: true, icon: <Building className="h-5 w-5 mr-2" /> },
    { label: 'Industry', field: 'industry', multiline: false, icon: <Building className="h-5 w-5 mr-2" /> },
    { label: 'Website', field: 'website', multiline: false, icon: <Building className="h-5 w-5 mr-2" /> },
    { label: 'Location', field: 'location', multiline: false, icon: <MapPin className="h-5 w-5 mr-2" /> },
    { label: 'Size', field: 'size', multiline: false, icon: <Building className="h-5 w-5 mr-2" /> },
    { label: 'Email', field: 'email', multiline: false, icon: <Mail className="h-5 w-5 mr-2" /> },
    { label: 'Phone', field: 'phone', multiline: false, icon: <Phone className="h-5 w-5 mr-2" /> },
  ];

  // Fetch company profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get(`/companies/${token}`); // Replace with the appropriate endpoint
        console.log(response)

        if (response.data.length > 0) {
          console.log(response)
          setProfile(response.data[0]); // Assuming backend returns an array of companies
          setStatus(true)
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Save or update the company profile
  const handleSave = async () => {
    try {
      if (status) {
        console.log("profile",profile)
        // Update existing profile
        await API.put(`/companies/${token}`, profile); // Replace with backend's ID field
        console.log('Profile updated successfully');
      } else {
        // Add new profile
        console.log("profile",profile)
        const response = await API.post(`/companies/${token}`, profile);
        setProfile(response.data);
        console.log('Profile created successfully');
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleAddProfile = () => {
    setProfile({
      id: '',
      name: '',
      description: '',
      industry: '',
      website: '',
      location: '',
      size: '',
      email: '',
      phone: '',
    });
    setIsEditing(true);
  };

  return (
    <div className="w-11/12 mx-auto space-y-6">
      {/* Company Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-indigo-500 to-purple-600">
          <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30">
            <Camera className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-12">
            <div className="relative">
              <div className="h-24 w-24 rounded-lg bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <Building className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            {!profile ? (
              <button
                onClick={handleAddProfile}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Profile
              </button>
            ) : (
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Company Information */}
      {profile && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-6">
            {fields.map(({ label, field, multiline, icon }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </label>
                {isEditing ? (
                  multiline ? (
                    <textarea
                      value={(profile as any)[field]}
                      onChange={(e) =>
                        setProfile({ ...profile, [field]: e.target.value })
                      }
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={(profile as any)[field]}
                      onChange={(e) =>
                        setProfile({ ...profile, [field]: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  )
                ) : (
                  <p className="mt-1 text-gray-600 dark:text-gray-400 flex items-center">
                    {icon}
                    {(profile as any)[field]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
