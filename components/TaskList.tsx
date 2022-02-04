/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useEffect, useState } from 'react';

import DraggableTasks from './UI/DraggableTasks';
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
      <DraggableTasks list={props.list} setList={props.setList} />
    </>
  );
};

export default TaskList;
