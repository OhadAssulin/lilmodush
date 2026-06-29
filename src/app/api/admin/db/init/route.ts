import { getSql, hasDirectDatabaseUrl } from "@/lib/server/db";
import { schemaStatements } from "@/lib/server/schema";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!hasDirectDatabaseUrl()) {
    return Response.json(
      {
        initialized: false,
        error:
          "SUPABASE_DATABASE_URL is not configured. Run supabase/schema.sql in Supabase SQL Editor, or add the pooled database connection string to enable this button.",
      },
      { status: 503 }
    );
  }

  const sql = getSql();

  for (const statement of schemaStatements) {
    await sql.unsafe(statement);
  }

  return Response.json({
    initialized: true,
    provider: "supabase-postgres",
    statements: schemaStatements.length,
  });
}
