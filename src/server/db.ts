import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_PUBLIC_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log(supabase);

export default supabase;
