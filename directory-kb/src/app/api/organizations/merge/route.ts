import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { mergeOrganizationsSchema } from "@/lib/validation";
import { mergeOrganizations } from "@/services/duplicate-service";

export async function POST(req: NextRequest) {
  return handleApi(async () => {
    const body = mergeOrganizationsSchema.parse(await req.json());
    return mergeOrganizations({
      winnerId: body.winner_id,
      loserId: body.loser_id,
      mergedBy: body.merged_by,
    });
  });
}
