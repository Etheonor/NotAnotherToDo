import { definitions } from '../types/database/index';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';

const Projects = (props: {
  data: definitions['projects'][];
  count: number;
}): JSX.Element => {
  const [count, setCount] = useState(props.count);
  const [currentProjects, setCurrentProjects] = useState(props.data);

  console.log(currentProjects);

  const getProjects = async (count: number) => {
    const { newProjects, newCount } = await supabase
      .from<definitions['projects']>('projects')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: true })
      .range(count, count);

    console.log(newProjects);
    console.log(newCount);

    //setCount(newCount as number);
    //setCurrentProjects([...currentProjects, ...newProjects]);
  };
  return (
    <>
      <h2>Projects</h2>
      <pre>
        {currentProjects &&
          currentProjects.map((project: definitions['projects']) => {
            return (
              <div key={project.id}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            );
          })}
      </pre>
      <button onClick={() => getProjects(count)}>Load more</button>
    </>
  );
};

export default Projects;
