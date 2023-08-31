import supabase from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export type Input = {
  name: string;
};
export const POST = (async ({ request }) => {
  try {
    const body = await request.json();

    const { data, error } = await supabase.from('programs').insert(body).select();

    if (error) {
      throw new Error(error.message);
    }

    return json(data);
  } catch (e: any) {
    return json({ data: e.message }, { status: 500 });
  }
}) satisfies RequestHandler;
