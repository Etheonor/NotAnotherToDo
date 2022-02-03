import Head from 'next/head';
import Layout from 'components/Layout';
import NewProjectForm from 'components/NewProjectForm';
import type { NextPageContext } from 'next';
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NewProject = ({
  user,
}: {
  user: {
    id: string;
  };
}): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    // If a user is not logged in, return to the homepage
    if (!user) {
      void router.push('/');
    }
  }, [router, user]);

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Dashboard</title>
      </Head>

      <Layout>
        <>
          <h2 className="text-center font-title text-4xl">
            Create a new project
          </h2>
          <p className="text-center">
            {' '}
            You can create a new project here. It will be available for all
            users and they'll be able to add it to their backlog!
          </p>

          <NewProjectForm />
        </>
      </Layout>
    </div>
  );
};

export async function getServerSideProps(
  context: NextPageContext
): Promise<any> {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ADMIN_KEY || ''
  );
  const { user } = await supabaseAdmin.auth.api.getUserByCookie(context.req);

  // If the user exist, you will retrieve the user profile
  if (user) {
    return {
      props: {
        user,
      },
    };
  }

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  // If there is a user, return it.
  return null;
}
export default NewProject;
