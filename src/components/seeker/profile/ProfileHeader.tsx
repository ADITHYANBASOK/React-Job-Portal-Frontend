import { Camera } from 'lucide-react';

interface Props {
  name: string;
  email: string;
  avatar: string;
}

export default function ProfileHeader({ name, email, avatar }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
      <div className="relative h-48 rounded-t-lg bg-indigo-600">
        <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white">
          <Camera className="h-5 w-5" />
        </button>
      </div>
      <div className="relative px-6 pb-6">
        <div className="flex items-center">
          <div className="relative -top-16">
            <img
              src={avatar}
              alt={name}
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800"
            />
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white shadow">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div className="ml-6 -mt-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { Camera } from 'lucide-react';
// import { useRef } from 'react';

// interface Props {
//   name: string;
//   email: string;
//   avatar: string;
//   onAvatarChange: (file: File) => void;
// }

// export default function ProfileHeader({ name, email, avatar, onAvatarChange }: Props) {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onAvatarChange(file); // Call the parent handler with the selected file
//     }
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click(); // Trigger the file input when the button is clicked
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
//       <div className="relative h-48 rounded-t-lg bg-indigo-600">
//         <button
//           onClick={handleClick}
//           className="absolute bottom-4 right-4 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
//         >
//           <Camera className="h-5 w-5" />
//         </button>
//       </div>
//       <div className="relative px-6 pb-6">
//         <div className="flex items-center">
//           <div className="relative -top-16">
//             <img
//               src={avatar}
//               alt={name}
//               className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800"
//             />
//             <button
//               onClick={handleClick}
//               className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white shadow"
//             >
//               <Camera className="h-5 w-5" />
//             </button>
//             {/* Hidden file input */}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: 'none' }} // Hide the input
//             />
//           </div>
//           <div className="ml-6 -mt-6">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
//             <p className="text-gray-600 dark:text-gray-400">{email}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
