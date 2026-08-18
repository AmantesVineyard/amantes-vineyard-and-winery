import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { reviewActionSchema } from "@/lib/validation";
import { reviewStagingRecord } from "@/services/import-service";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApi(async () => {
    const action = reviewActionSchema.parse(await req.json());
    return reviewStagingRecord((await params).id, action);
  });
}
