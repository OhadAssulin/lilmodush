import { hasDatabase } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    configured: hasDatabase(),
    provider: "neon-postgres",
  });
}
