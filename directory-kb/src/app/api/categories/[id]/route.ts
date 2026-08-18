import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { getCategoryDetail } from "@/services/category-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApi(async () => getCategoryDetail((await params).id));
}
