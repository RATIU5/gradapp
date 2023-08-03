import supabase from "$lib/server/db.server";
import { json, type RequestHandler } from "@sveltejs/kit";

export type Output = {
    id: string;
    name: string;
    people: {
        id: string;
        firstname: string;
        lastname: string;
        programid: number;
        email: string;
        platinum: boolean;
        highschool: boolean;
        persontype: 1 | 2 | 3;
        present: boolean;
    }
}[] | string;

export const GET = (async () => {
    try {
        const { data, error } = await supabase.from("programs")
        .select(`name, id, people ( * )`)
        .is("people.present", true)
        .gt("people.persontype", 1);

        if (error) {
            throw error;
        }

        return json({ data }, { status: 200 });

    } catch (e: any) {
        return json({ data: e.message }, { status: 500 });
    }
    
}) satisfies RequestHandler; 
