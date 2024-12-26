// import { useState } from 'react';
// import { Plus } from 'lucide-react';

// interface Skill {
//   id: string;
//   name: string;
//   level: number;
// }

// export default function SkillsList() {
//   const [skills, setSkills] = useState<Skill[]>([
//     { id: '1', name: 'React', level: 90 },
//     { id: '2', name: 'TypeScript', level: 85 },
//     { id: '3', name: 'Node.js', level: 80 },
//   ]);

//   const handleAddSkill = () => {
//     const newSkill: Skill = {
//       id: Date.now().toString(),
//       name: '',
//       level: 50,
//     };
//     setSkills([...skills, newSkill]);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//           Skills
//         </h2>
//         <button
//           onClick={handleAddSkill}
//           className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Skill
//         </button>
//       </div>

//       <div className="space-y-4">
//         {skills.map((skill) => (
//           <div key={skill.id} className="space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {skill.name}
//               </span>
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {skill.level}%
//               </span>
//             </div>
//             <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
//               <div
//                 className="h-2 bg-indigo-600 rounded-full"
//                 style={{ width: `${skill.level}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // Import dialog components
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Skill {
  id: string;
  name: string;
  level: number;
}

export default function SkillsList() {
  const [skills, setSkills] = useState<Skill[]>([
    
  ]);
  const token = localStorage.getItem('Stoken')

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({
    id: '',
    name: '',
    level: 50,
  });


  useEffect(() => {
    const fetchSkills = async () => {
      try {
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/skill`,  {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response.data",response.data)
        setSkills(response.data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };
  
    fetchSkills();
  }, []);

  const handleAddSkill = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewSkill({
      id: '',
      name: '',
      level: 50,
    });
  };

  

  const handleSubmit = async () => {
    try {
    
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/skill`, {
        name: newSkill.name,
        level: newSkill.level, 
      },{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response3",response)
      setSkills([...skills, response.data]);
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Skills
        </h2>
        <button
          onClick={handleAddSkill}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {skill.level}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Box */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogDescription>
              Please fill out the details below to add your skill.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Skill Name</label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="Enter skill name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Skill Level</label>
              <Slider
                value={[newSkill.level]}
                onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
                min={0}
                max={100}
                step={1}
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Level: {newSkill.level}%
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCloseDialog} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Skill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
