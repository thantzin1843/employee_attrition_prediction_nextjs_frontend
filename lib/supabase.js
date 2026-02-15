// https://xzkvvikxvenwpdopoovu.supabase.co/recent_predictions <==== supabase api access

import { createClient } from '@supabase/supabase-js'
// console.log('supabase url:', process.env.NEXT_PUBLIC_SUPABASE_URL)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)
