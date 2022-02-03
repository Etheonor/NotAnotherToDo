/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 *
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from 'utils/supabaseClient';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
): void {
  supabase.auth.api.setAuthCookie(request, response);
}
