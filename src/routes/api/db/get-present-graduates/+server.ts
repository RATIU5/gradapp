import supabase from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
    try {
        const { data, error } = await supabase
            .from('programs')
            .select(`name, id, people ( * )`)
            .is('people.present', true)
            .gt('people.persontype', 1);

        if (error) {
            throw error;
        }

        return json({ data }, { status: 200 });
    } catch (e: any) {
        return json({ data: e.message }, { status: 500 });
    }
}) satisfies RequestHandler;
