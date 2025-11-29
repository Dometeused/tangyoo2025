// ✅ src/lib/supabaseClient.js
"use client"; // จำเป็นสำหรับ component client

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default supabase;
