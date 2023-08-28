import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

export const GET = async ({ request, locals, url }) => {
  const provider = url.searchParams.get('provider') as Provider;

  if (provider) {
    const { data, error: err } = await locals.sb.auth.signInWithOAuth({
      provider
    });

    if (err) {
      console.error(err);
      return fail(400, {
        message: 'Something went wrong'
      });
    }

    console.log(data);

    throw redirect(303, data.url);
  }
};
