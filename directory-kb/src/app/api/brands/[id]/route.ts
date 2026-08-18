import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { getBrandDetail } from "@/services/brand-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApi(async () => getBrandDetail((await params).id));
}
