import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  console.log(session);
  if (session === null) {
    console.log('redirect');
    throw redirect(304, '/');
  }
};
