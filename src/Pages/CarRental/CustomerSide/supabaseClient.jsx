// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://svoaabrejgopvzhlnpxv.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2b2FhYnJlamdvcHZ6aGxucHh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTg5MTM5OCwiZXhwIjoyMDYxNDY3Mzk4fQ.2cmWfta8Jtw0NfnmKR_UwvG8Bn6Nwu2QwqYkfpPzKaY";

// export const supabase = createClient(supabaseUrl, supabaseKey);
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://svoaabrejgopvzhlnpxv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2b2FhYnJlamdvcHZ6aGxucHh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTg5MTM5OCwiZXhwIjoyMDYxNDY3Mzk4fQ.2cmWfta8Jtw0NfnmKR_UwvG8Bn6Nwu2QwqYkfpPzKaY"; 

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // ✅ ensures the session survives page reload
    autoRefreshToken: true, // ✅ ensures the session auto-renews
  },
});
