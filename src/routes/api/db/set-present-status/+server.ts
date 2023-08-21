import supabase from '$lib/server/db.server';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	try {
		const body = await request.json();
		console.log(body);

		const { data, error } = await supabase
			.from('people')
			.update({ present: body.status })
			.eq('id', body.id)
			.select();
		if (error) {
			throw error;
		}

		return json({ data }, { status: 200 });
	} catch (e: any) {
		return json({ data: e.message }, { status: 500 });
	}
}) satisfies RequestHandler;
