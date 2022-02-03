/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';

import { FiPlusCircle } from 'react-icons/fi';

const TaskList = (props: {
  list: { id: string; name: string }[];
  setList: (arg0: any[]) => void;
}): JSX.Element => {
  const [newTask, setNewTask] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log(props.list);
  }, [props.list]);

  const handleOnDragEnd = (result: any) => {
    console.log(result);
    const items = [...props.list];
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
    }

    props.setList(items);
  };

  const addNewTask = (): void => {
    const newTaskList = [...props.list];
    newTaskList.push({
      id: count.toString(),
      name: newTask,
    });
    props.setList(newTaskList);
    setCount(count + 1);
    setNewTask('');
  };

  return (
    <>
      <div className="m-auto w-96 flex align-middle mb-10">
        <input
          className="input input-primary input-bordered max-w-xl m-auto mr-5"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button
          className={`btn btn-primary btn-sm m-auto`}
          onClick={addNewTask}>
          <FiPlusCircle />
          <span className="ml-3">Add a Task</span>
        </button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided: DroppableProvided) => (
            <ul
              className="flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {props.list.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={id}
                        className="border border-primary list-none text-center mb-5">
                        <p className="m-auto p-5 text-center">{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              <div className="list-none">{provided.placeholder}</div>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TaskList;
