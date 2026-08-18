import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { importBatchInputSchema } from "@/lib/validation";
import { createImportBatch, listImportBatches } from "@/services/import-service";

export async function GET() {
  return handleApi(async () => listImportBatches());
}

export async function POST(req: NextRequest) {
  return handleApi(async () => {
    const body = importBatchInputSchema.parse(await req.json());
    return createImportBatch(body);
  });
}
