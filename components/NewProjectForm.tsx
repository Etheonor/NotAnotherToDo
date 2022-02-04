import axios, { AxiosError } from 'axios';

import MarkdownEditor from './MarkdownEditor';
import TaskList from 'components/TaskList';
import { toast } from 'react-toastify';
import { useAuth } from 'utils/AuthContext';
import { useState } from 'react';

interface ItemType {
  id: string;
  name: string;
  order: number;
}

const NewProjectForm = (): JSX.Element => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [list, setList] = useState<ItemType[]>([]);
  const { user } = useAuth();

  const handleProject = async (): Promise<void> => {
    const project = {
      name: projectName,
      description: projectDescription,
      list: list,
    };

    try {
      const addedProject = await axios.post('/api/addProject', {
        project,
        user,
      });

      toast.success(addedProject.data as string);
    } catch (error) {
      const err = error as AxiosError;

      if (
        err.response?.data ===
        'duplicate key value violates unique constraint "projects_name_key"'
      ) {
        toast.error('Project name already exists');
      }
    }
  };

  return (
    <div className="m-auto max-w-3xl">
      <div className="flex flex-col m-auto justify-center mb-10">
        <p className="font-bold m-auto mb-5">
          First, choose a cool name for your project!
        </p>
        <input
          className="input input-primary input-bordered max-w-xl m-auto"
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col m-auto justify-center mb-10">
        <p className="font-bold m-auto mb-5">
          Then, write a description for your project, explain what the user will
          have to do.
        </p>
        <MarkdownEditor
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
        />
      </div>

      <div className="flex flex-col m-auto justify-center mb-10">
        <p className="font-bold m-auto mb-5">
          Finally, add some tasks to your project.
        </p>
        <TaskList list={list} setList={setList} />
      </div>

      <div className="flex flex-col m-auto justify-center mb-10">
        <p className="font-bold m-auto mb-5">
          Everything's ready? Save your project!
        </p>
        <button className="btn btn-primary m-auto" onClick={handleProject}>
          Save Project
        </button>
      </div>
    </div>
  );
};

export default NewProjectForm;
