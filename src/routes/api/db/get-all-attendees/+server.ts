import supabase from '$lib/server/db.server';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	try {
		const { data, error } = await supabase.from('people').select(`*, programs ( name )`);

		if (error) {
			throw error;
		}

		return json({ data }, { status: 200 });
	} catch (e: any) {
		return json({ data: e.message }, { status: 500 });
	}
}) satisfies RequestHandler;
