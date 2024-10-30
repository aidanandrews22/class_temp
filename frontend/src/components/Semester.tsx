import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Course from './Course';
import { Semester as SemesterType, Course as CourseType } from '../types';

interface SemesterProps {
  semester: SemesterType;
  courses: CourseType[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  maxSlots: number;
  isDragging: boolean;
  dragSourceId: string | null;
}

const Semester: React.FC<SemesterProps> = ({ 
  semester, 
  courses, 
  setErrorMessage, 
  maxSlots,
  isDragging,
  dragSourceId
}) => {
  const emptySlots = maxSlots - courses.length;

  return (
    <div className="semester">
      <div className="semester-title">{semester.name}</div>
      <Droppable droppableId={semester.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="class-container"
          >
            {courses.map((course, index) => (
              <div key={course.id} className={`class-slot ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}>
                <Course
                  course={course}
                  index={index}
                  setErrorMessage={setErrorMessage}
                  isDragging={isDragging}
                  isSource={dragSourceId === course.id}
                />
              </div>
            ))}
            {[...Array(emptySlots)].map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className={`class-slot empty-slot ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
              ></div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button className="add-class-button" onClick={() => console.log('Add class clicked')}>+</button>
    </div>
  );
};

export default Semester;