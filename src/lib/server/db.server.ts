import { createClient } from "@supabase/supabase-js"
import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from "$env/static/private"

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {});

export default supabase;
