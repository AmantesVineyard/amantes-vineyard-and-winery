import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { getOrganizationDetail } from "@/services/organization-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApi(async () => getOrganizationDetail((await params).id));
}
