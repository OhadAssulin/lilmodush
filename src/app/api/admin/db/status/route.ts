import {
  getSupabaseUrl,
  hasDatabase,
  hasDirectDatabaseUrl,
  hasSupabaseBrowserKey,
  hasSupabaseAnonKey,
  hasSupabasePublishableKey,
  hasSupabaseServiceRoleKey,
} from "@/lib/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    configured: hasDatabase(),
    provider: "supabase",
    url: getSupabaseUrl(),
    hasPublishableKey: hasSupabasePublishableKey(),
    hasAnonKey: hasSupabaseAnonKey(),
    hasBrowserKey: hasSupabaseBrowserKey(),
    hasSecretKey: hasSupabaseServiceRoleKey(),
    canInitializeSchema: hasDirectDatabaseUrl(),
  });
}
