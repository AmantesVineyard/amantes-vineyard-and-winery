import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { getSourceDocumentDetail } from "@/services/source-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApi(async () => getSourceDocumentDetail((await params).id));
}
