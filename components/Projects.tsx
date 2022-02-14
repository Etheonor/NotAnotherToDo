import { definitions } from '../types/database/index';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';

const Projects = (props: {
  data: definitions['projects'][];
  count: number;
}): JSX.Element => {
  const [cursor, setCursor] = useState(props.data.length);
  const [totalProjects, setTotalProjects] = useState(props.count);
  const [currentProjects, setCurrentProjects] = useState(props.data);

  console.log(currentProjects);

  const getNextProjects = async (): Promise<void> => {
    await supabase
      .from<definitions['projects']>('projects')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: true })
      .range(cursor, cursor)
      .then((result) => {
        setCurrentProjects([...currentProjects, ...(result.data as [])]);
        setCursor(cursor + 1);
      });
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
      {totalProjects > cursor ? (
        <button onClick={async () => getNextProjects()}>Load more</button>
      ) : null}
    </>
  );
};

export default Projects;
