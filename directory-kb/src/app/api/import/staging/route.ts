import { NextRequest } from "next/server";
import { handleApi, searchParamsToObject } from "@/lib/api";
import { listStagingRecords } from "@/services/import-service";

export async function GET(req: NextRequest) {
  return handleApi(async () => {
    const p = searchParamsToObject(req.url);
    return listStagingRecords({
      batchId: p.batchId,
      status: p.status,
      page: p.page ? Number(p.page) : undefined,
      pageSize: p.pageSize ? Number(p.pageSize) : undefined,
    });
  });
}
