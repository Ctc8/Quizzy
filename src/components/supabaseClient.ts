import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
	import.meta?.env?.VITE_SUPABASE_URL ||
	"https://knrtgdrqmawdpdkzypxg.supabase.co"

const supabaseAnonKey =
	import.meta?.env?.VITE_SUPABASE_ANON_KEY ||
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucnRnZHJxbWF3ZHBka3p5cHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDk0ODIsImV4cCI6MjA2NDU4NTQ4Mn0.TNiMq_vY_ubSdW_VEQDlZz5-hwEjJ94930UhP_XiVPc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
