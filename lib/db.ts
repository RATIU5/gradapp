import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_PUBLIC_KEY as string;
const supabaseOptions = {};
const supabase = createClient(supabaseUrl, supabaseKey, supabaseOptions);

export default supabase;
