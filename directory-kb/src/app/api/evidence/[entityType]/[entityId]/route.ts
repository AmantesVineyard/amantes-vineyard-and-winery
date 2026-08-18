import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { getEvidenceForEntity } from "@/services/source-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ entityType: string; entityId: string }> }
) {
  return handleApi(async () => {
    const { entityType, entityId } = await params;
    return getEvidenceForEntity(entityType, entityId);
  });
}
