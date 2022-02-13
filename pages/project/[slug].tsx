import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import DraggableTasks from 'components/UI/DraggableTasks';
import Image from 'next/image';
import Layout from 'components/Layout';
import Link from 'next/link';
import NotFound from 'public/notfound.svg';
import { createClient } from '@supabase/supabase-js';
import { definitions } from '../../types/database/index';
import { useState } from 'react';

const ProjectPage = ({
  project,
}: {
  project: definitions['projects'];
}): JSX.Element => {
  const [list, setList] = useState(project.backlog);
  if (!project) {
    return (
      <Layout>
        <div className="m-auto max-w-md text-center p-10">
          <Image src={NotFound as string} alt="Not found folder" />
          <h2 className="text-xl m-auto">
            This project does not exist... yet!
          </h2>
          <p className="text-md">
            {' '}
            If you want to create a project, don't hesitate to{' '}
            <Link href="/new-project">
              <a className="link-primary">add it here</a>
            </Link>{' '}
            👍
          </p>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <>
          <div className="m-auto mt-10 p-10 bg-base-content text-base-300 shadow-lg rounded-xl">
            <h1 className="text-center">{project.name}</h1>
            {project.updated_at && (
              <p className="text-right">
                Last update:{' '}
                {new Date(project.updated_at).toLocaleDateString('en-US')}
              </p>
            )}
            <hr className="my-10" />
            <p className="max-w-lg m-auto">{project.description}</p>
            <div className="max-w-md m-auto">
              {list && <DraggableTasks list={list} setList={setList} />}
            </div>
          </div>
        </>
      </Layout>
    );
  }
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    project: definitions['projects'] | null;
  }>
> {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ADMIN_KEY || ''
  );

  // Get the slug of the project from the Database
  if (context.params) {
    const project = await supabaseAdmin
      .from<definitions['projects']>('projects')
      .select('*')
      .eq('slug', context.params.slug as string)
      .single();

    return {
      props: {
        project: project.data,
      },
    };
  }
  // If the user exist, you will retrieve the user profile

  return {
    props: {
      project: null,
    },
  };
}
export default ProjectPage;
