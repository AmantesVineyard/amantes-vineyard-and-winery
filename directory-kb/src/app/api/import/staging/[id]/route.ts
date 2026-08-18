import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { getStagingRecord } from "@/services/import-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApi(async () => getStagingRecord((await params).id));
}
