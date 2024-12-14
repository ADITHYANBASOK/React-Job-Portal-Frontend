// import { Save } from 'lucide-react';

// interface ProfileData {
//   name: string;
//   email: string;
//   bio: string;
//   location: string;
//   phone: string;
// }

// interface Props {
//   profileData: ProfileData;
//   isEditing: boolean;
//   onEdit: () => void;
//   onUpdate: (data: ProfileData) => void;
// }

// export default function ProfileInfo({
//   profileData,
//   isEditing,
//   onEdit,
//   onUpdate,
// }: Props) {
//   const handleUpdate = (field: keyof ProfileData, value: string) => {
//     onUpdate({ ...profileData, [field]: value });
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Profile Information
//         </h2>
//         <button
//           onClick={onEdit}
//           className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//         >
//           {isEditing ? 'Cancel' : 'Edit Profile'}
//         </button>
//       </div>

//       <div className="space-y-4">
//         {isEditing ? (
//           <>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={profileData.name}
//                 onChange={(e) => handleUpdate('name', e.target.value)}
//                 className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Bio
//               </label>
//               <textarea
//                 value={profileData.bio}
//                 onChange={(e) => handleUpdate('bio', e.target.value)}
//                 rows={4}
//                 className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={onEdit}
//                 className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//               >
//                 <Save className="h-4 w-4 mr-2" />
//                 Save Changes
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="space-y-4">
//             <p className="text-gray-600 dark:text-gray-400">{profileData.bio}</p>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                   Location
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-900 dark:text-white">
//                   {profileData.location}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                   Phone
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-900 dark:text-white">
//                   {profileData.phone}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Save } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // Import dialog components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProfileData {
  // name: string;
  // email: string;
  bio: string;
  location: string;
  phone: string;
}

interface Props {
  profileData: ProfileData;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (data: ProfileData) => void;
}

export default function ProfileInfo({ profileData, isEditing, onEdit, onUpdate }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedProfileData, setUpdatedProfileData] = useState(profileData);

  const handleUpdate = (field: keyof ProfileData, value: string) => {
    setUpdatedProfileData({ ...updatedProfileData, [field]: value });
  };

  const handleSaveChanges = () => {
    onUpdate(updatedProfileData);
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Profile Information
        </h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {profileData.bio?'Edit Profile':'Add Profile'}
        </button>
      </div>


      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">{profileData?.bio}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Location
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {profileData?.location}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Phone
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {profileData?.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Dialog Box for Editing Profile */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Name</label>
              <Input
                value={updatedProfileData.name}
                onChange={(e) => handleUpdate('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Bio</label>
              <textarea
                value={updatedProfileData.bio || ''}
                onChange={(e) => handleUpdate('bio', e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Location</label>
              <Input
                value={updatedProfileData.location || ''}
                onChange={(e) => handleUpdate('location', e.target.value)}
                placeholder="Enter your location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Phone</label>
              <Input
                value={updatedProfileData.phone || ''}
                onChange={(e) => handleUpdate('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}







// import { useState } from 'react';
// import { Save } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from '@/components/ui/dialog'; // Import dialog components
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// interface ProfileData {
//   name: string;
//   email: string;
//   bio: string;
//   location: string;
//   phone: string;
// }

// interface Props {
//   profileData: ProfileData | null; // Allow profileData to be nullable
//   isEditing: boolean;
//   onEdit: () => void;
//   onUpdate: (data: ProfileData) => void;
//   onAdd: (data: ProfileData) => void; // Function for adding new profile data
// }

// export default function ProfileInfo({
//   profileData,
//   isEditing,
//   onEdit,
//   onUpdate,
//   onAdd,
// }: Props) {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [updatedProfileData, setUpdatedProfileData] = useState<ProfileData>(
//     profileData || {
//       name: '',
//       email: '',
//       bio: '',
//       location: '',
//       phone: '',
//     }
//   );

//   const handleUpdate = (field: keyof ProfileData, value: string) => {
//     setUpdatedProfileData({ ...updatedProfileData, [field]: value });
//   };

//   const handleSaveChanges = () => {
//     if (!profileData) {
//       onAdd(updatedProfileData); // Call onAdd if creating a new profile
//     } else {
//       onUpdate(updatedProfileData); // Call onUpdate if editing an existing profile
//     }
//     setIsDialogOpen(false);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Profile Information
//         </h2>
//         <button
//           onClick={() => setIsDialogOpen(true)}
//           className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//         >
//           {profileData ? 'Edit Profile' : 'Add Profile'}
//         </button>
//       </div>

//       {profileData ? (
//         <div className="space-y-4">
//           <p className="text-gray-600 dark:text-gray-400">{profileData.bio}</p>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                 Location
//               </h3>
//               <p className="mt-1 text-sm text-gray-900 dark:text-white">
//                 {profileData.location}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                 Phone
//               </h3>
//               <p className="mt-1 text-sm text-gray-900 dark:text-white">
//                 {profileData.phone}
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-600 dark:text-gray-400">No profile data available.</p>
//       )}

//       {/* Dialog Box for Adding/Editing Profile */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               {profileData ? 'Edit Profile' : 'Add Profile'}
//             </DialogTitle>
//             <DialogDescription>
//               {profileData
//                 ? 'Update your profile details below.'
//                 : 'Create your profile by filling out the details below.'}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
//                 Name
//               </label>
//               <Input
//                 value={updatedProfileData.name}
//                 onChange={(e) => handleUpdate('name', e.target.value)}
//                 placeholder="Enter your name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
//                 Bio
//               </label>
//               <textarea
//                 value={updatedProfileData.bio}
//                 onChange={(e) => handleUpdate('bio', e.target.value)}
//                 rows={4}
//                 className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
//                 Location
//               </label>
//               <Input
//                 value={updatedProfileData.location}
//                 onChange={(e) => handleUpdate('location', e.target.value)}
//                 placeholder="Enter your location"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
//                 Phone
//               </label>
//               <Input
//                 value={updatedProfileData.phone}
//                 onChange={(e) => handleUpdate('phone', e.target.value)}
//                 placeholder="Enter your phone number"
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button onClick={() => setIsDialogOpen(false)} variant="outline">
//               Cancel
//             </Button>
//             <Button onClick={handleSaveChanges}>
//               <Save className="h-4 w-4 mr-2" />
//               Save Changes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
