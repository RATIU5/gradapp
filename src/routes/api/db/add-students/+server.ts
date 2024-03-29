import supabase from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export type Input = {
    firstname: string;
    lastname: string;
    email: string;
    programid: number;
    platinum: boolean;
    highschool: boolean;
    isfaculty: boolean;
}[];
export const POST = (async ({ request }) => {
    try {
        const body = await request.json();

        for (let i = 0; i < body.length; i++) {
            if (body[i].isfaculty) {
                body[i].persontype = 3;
            } else {
                body[i].persontype = 2;
            }
            delete body[i].isfaculty;
            body[i].present = false;
        }

        const { data, error } = await supabase.from('people').insert(body).select();

        if (error) {
            throw new Error(error.message);
        }

        return json(data);
    } catch (e: any) {
        return json({ data: e.message }, { status: 500 });
    }
}) satisfies RequestHandler;
