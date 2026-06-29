import { hasDatabase, getSql } from "@/lib/server/db";
import { schemaStatements } from "@/lib/server/schema";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!hasDatabase()) {
    return Response.json(
      {
        initialized: false,
        error: "DATABASE_URL is not configured",
      },
      { status: 503 }
    );
  }

  const sql = getSql();

  for (const statement of schemaStatements) {
    await sql.query(statement);
  }

  return Response.json({
    initialized: true,
    statements: schemaStatements.length,
  });
}
