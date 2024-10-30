import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import Course from './Course';
import { Course as CourseType, Semester } from '../types';

interface ClassContainerProps {
  courses: CourseType[];
  semesterIndex: number;
  semesters: Semester[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isDragging: boolean;
  dragSourceId: string | null;
}

const ClassContainer: React.FC<ClassContainerProps> = ({
  courses,
  semesterIndex,
  semesters,
  isDragging,
  setErrorMessage,
  dragSourceId,
}) => {
  return (
    <>
      {courses.map((course, index) => (
        <Draggable key={course.id} draggableId={course.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="class-slot"
            >
              <Course
                key={course.id}
                course={course}
                index={index}
                setErrorMessage={setErrorMessage}
                isDragging={isDragging}
                isSource={dragSourceId === course.id}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default ClassContainer;