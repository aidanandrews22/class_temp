import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Course as CourseType } from '../types';

interface CourseProps {
  course: CourseType;
  index: number;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isDragging: boolean;
  isSource: boolean;
}

const Course: React.FC<CourseProps> = ({ course, index, setErrorMessage, isDragging, isSource }) => {
  const { id, name, creditHours } = course;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`class ${snapshot.isDragging ? 'dragging' : ''} ${isDragging && isSource ? 'drag-source' : ''}`}
          data-id={id}
        >
          <div className="class-name">{name}</div>
          <div className="class-id">{id}</div>
          <div className="credit-hours">Credits: {creditHours}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Course;