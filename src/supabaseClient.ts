import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tffrqlyjqhjdlssmmbve.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0BKVyFBlhd-YrWa7swcVaQ_GsUk4Vjn";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);