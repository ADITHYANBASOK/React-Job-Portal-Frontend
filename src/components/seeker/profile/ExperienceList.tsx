// import  { useState } from 'react';
// import { Plus } from 'lucide-react';

// interface Experience {
//   id: string;
//   title: string;
//   company: string;
//   startDate: string;
//   endDate: string;
//   description: string;
// }

// export default function ExperienceList() {
//   const [experiences, setExperiences] = useState<Experience[]>([
//     {
//       id: '1',
//       title: 'Senior Frontend Developer',
//       company: 'Tech Corp',
//       startDate: '2020-01',
//       endDate: 'Present',
//       description: 'Led the frontend development team in building modern web applications.',
//     },
//   ]);

//   const handleAddExperience = () => {
//     const newExperience: Experience = {
//       id: Date.now().toString(),
//       title: '',
//       company: '',
//       startDate: '',
//       endDate: '',
//       description: '',
//     };
//     setExperiences([...experiences, newExperience]);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Experience
//         </h2>
//         <button
//           onClick={handleAddExperience}
//           className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Experience
//         </button>
//       </div>

//       <div className="space-y-6">
//         {experiences.map((experience) => (
//           <div
//             key={experience.id}
//             className="border-l-2 border-indigo-600 pl-4 space-y-2"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                   {experience.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {experience.company}
//                 </p>
//               </div>
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {experience.startDate} - {experience.endDate}
//               </span>
//             </div>
//             <p className="text-gray-600 dark:text-gray-400">
//               {experience.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // Import your dialog components
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export default function ExperienceList() {
  const [experiences, setExperiences] = useState<Experience[]>([
    // {
    //   id: '1',
    //   title: 'Senior Frontend Developer',
    //   company: 'Tech Corp',
    //   startDate: '2020-01',
    //   endDate: 'Present',
    //   description: 'Led the frontend development team in building modern web applications.',
    // },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: '',
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const token =localStorage.getItem('Stoken')

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/experience`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();
  }, []);

  const handleAddExperience = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewExperience({
      id: '',
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  // const handleSubmit = () => {
  //   const experienceToAdd = { ...newExperience, id: Date.now().toString() };
  //   setExperiences([...experiences, experienceToAdd]);
  //   handleCloseDialog();
  // };


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/experience', {
        ...newExperience,
      },{
        headers: { Authorization: `Bearer ${token}` },
      });
      setExperiences([...experiences, response.data]);
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/api/experiences/${id}`);
  //     setExperiences(experiences.filter((exp) => exp.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting experience:', error);
  //   }
  // };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Experience
        </h2>
        <button
          onClick={handleAddExperience}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="border-l-2 border-indigo-600 pl-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {experience.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {experience.company}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {experience.startDate} - {experience.endDate}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {experience.description}
            </p>
          </div>
        ))}
      </div>

      {/* Dialog Box */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Experience</DialogTitle>
            <DialogDescription>
              Please fill out the details below to add your experience.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Title</label>
              <Input
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                placeholder="Job Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Company</label>
              <Input
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                placeholder="Company Name"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Start Date</label>
                <Input
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">End Date</label>
                <Input
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
              <Textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="Describe your responsibilities..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCloseDialog} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Experience
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
