import { createClient } from '@supabase/auth-helpers-sveltekit';
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from '$env/static/private';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
