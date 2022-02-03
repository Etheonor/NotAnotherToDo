import { useEffect, useState } from 'react';

import Dashboard from '../components/Dashboard';
import Head from 'next/head';
import Layout from 'components/Layout';
import type { NextPageContext } from 'next';
import { createClient } from '@supabase/supabase-js';
import { definitions } from 'types/database/index';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

const DashboardPage = ({
  user,
  profile,
}: {
  user: {
    id: string;
  };
  profile: {
    github_profile: { user_name: string; email: string; avatar_url: string };
  };
  planName: string;
}): JSX.Element => {
  const [session, setSession] = useState(supabase.auth.session());
  const router = useRouter();
  useEffect(() => {
    // If a user is not logged in, return to the homepage
    if (!user) {
      void router.push('/');
    }
  }, [router, user]);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Dashboard</title>
      </Head>

      <Layout>
        {!session ? (
          <div className="text-center">You are not logged in</div>
        ) : (
          <>
            {session && (
              <Dashboard key={user.id || undefined} profile={profile} />
            )}
          </>
        )}
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
    const { data: profile } = await supabaseAdmin
      .from<definitions['profiles']>('profiles')
      .select(`github_profile`)
      .eq('id', user.id)
      .single();
    return {
      props: {
        user,
        profile,
        // Retrieve the name of the subscription plan (Don't forget to add nickname to your prices)
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
export default DashboardPage;
