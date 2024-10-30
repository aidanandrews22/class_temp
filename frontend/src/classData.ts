import { AppState } from './types';

const classData: AppState = {
  courses: {
    'MATH101': { id: 'MATH101', name: 'Calculus I', creditHours: 4, prereqs: [], coreqs: [], isPrereqFor: ['MATH102', 'PHYS101'] },
    'CS101': { id: 'CS101', name: 'Intro to Programming', creditHours: 3, prereqs: [], coreqs: [], isPrereqFor: ['CS201'] },
    'ENG101': { id: 'ENG101', name: 'English Composition', creditHours: 3, prereqs: [], coreqs: [], isPrereqFor: [] },
    'CHEM101': { id: 'CHEM101', name: 'General Chemistry', creditHours: 4, prereqs: [], coreqs: [], isPrereqFor: ['CHEM102'] },
    'MATH102': { id: 'MATH102', name: 'Calculus II', creditHours: 4, prereqs: ['MATH101'], coreqs: [], isPrereqFor: ['MATH201'] },
    'PHYS101': { id: 'PHYS101', name: 'Physics I', creditHours: 4, prereqs: ['MATH101'], coreqs: [], isPrereqFor: ['PHYS102'] },
    'CS201': { id: 'CS201', name: 'Data Structures', creditHours: 3, prereqs: ['CS101'], coreqs: [], isPrereqFor: [] },
    'CHEM102': { id: 'CHEM102', name: 'Organic Chemistry', creditHours: 4, prereqs: ['CHEM101'], coreqs: [], isPrereqFor: [] },
  },
  semesters: [
    { id: 'FALL2024', name: 'Fall 2024', courseIds: ['MATH101', 'CS101', 'ENG101', 'CHEM101'] },
    { id: 'SPRING2025', name: 'Spring 2025', courseIds: ['MATH102', 'PHYS101', 'CS201', 'CHEM102'] },
  ]
};

export default classData;