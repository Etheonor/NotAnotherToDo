import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const connectWithGithub = async (): Promise<void> => {
  await supabase.auth.signIn(
    { provider: 'github' },
    {
      scopes: 'public_repo',
    }
  );
};

export const updateGithubProfile = async (): Promise<void> => {
  const session = supabase.auth.session();
  if (session) {
    try {
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        github_profile: session.user?.user_metadata || '',
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      console.log('Profile update with Github information');
    }
  }
};
