// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://saspixhsrgtcwkfvidyr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3BpeGhzcmd0Y3drZnZpZHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1Mjk3MDcsImV4cCI6MjA1MDEwNTcwN30.BXnQPTdomp-r3XC9NQNCf9tdNPqrJiRK980KC2KAJWg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);