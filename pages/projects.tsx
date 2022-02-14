import Head from 'next/head';
import Layout from 'components/Layout';
import Projects from 'components/Projects';
import { definitions } from '../types/database/index';
import { supabase } from 'utils/supabaseClient';
import { useEffect } from 'react';

const ProjectsPage = ({
  data,
  count,
}: {
  data: definitions['projects'][];
  count: number;
}): JSX.Element => {
  useEffect(() => {
    console.log(data);
    console.log(count);
  }, []);
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Dashboard</title>
      </Head>

      <Layout>
        <>
          <h2 className="text-center font-title text-4xl">Projects</h2>
          <p className="text-center">
            {' '}
            Want to work on a new project? Select one from the list below.
          </p>

          <Projects data={data} count={count} />
        </>
      </Layout>
    </div>
  );
};

export default ProjectsPage;

export async function getServerSideProps() {
  const { data, count } = await supabase
    .from('projects')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: true })
    .range(0, 1);

  return {
    props: {
      data: data,
      count: count,
    },
  };
}
