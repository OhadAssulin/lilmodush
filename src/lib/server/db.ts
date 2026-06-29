import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import postgres, { type Sql } from "postgres";
import { DEFAULT_SUPABASE_URL } from "@/lib/supabase/config";

let supabaseClient: SupabaseClient | null = null;
let sqlClient: Sql | null = null;

export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
}

export function hasSupabaseAnonKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function hasSupabaseServiceRoleKey(): boolean {
  return Boolean(getSupabaseSecretKey());
}

export function hasSupabaseBrowserKey(): boolean {
  return hasSupabaseAnonKey();
}

export function hasDirectDatabaseUrl(): boolean {
  return Boolean(getDirectDatabaseUrl());
}

export function hasDatabase(): boolean {
  return Boolean(getSupabaseUrl() && (hasSupabaseAnonKey() || hasSupabaseServiceRoleKey()));
}

export function getSupabaseServerClient(): SupabaseClient {
  const supabaseKey = getSupabaseSecretKey() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseKey) {
    throw new Error(
      "SUPABASE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY, or NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured"
    );
  }

  if (!supabaseClient) {
    supabaseClient = createClient(getSupabaseUrl(), supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseClient;
}

export function getSql(): Sql {
  const connectionString = getDirectDatabaseUrl();
  if (!connectionString) {
    throw new Error("SUPABASE_DATABASE_URL is not configured");
  }

  if (!sqlClient) {
    sqlClient = postgres(connectionString, {
      max: 1,
      prepare: false,
      ssl: "require",
    });
  }

  return sqlClient;
}

function getDirectDatabaseUrl(): string | undefined {
  return process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
}

function getSupabaseSecretKey(): string | undefined {
  return process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
}
