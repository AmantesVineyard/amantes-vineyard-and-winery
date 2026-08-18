import { NextRequest } from "next/server";
import { handleApi, searchParamsToObject } from "@/lib/api";
import { globalSearchSchema } from "@/lib/validation";
import { searchProvider } from "@/services/search-service";

export async function GET(req: NextRequest) {
  return handleApi(async () => {
    const { q, limit } = globalSearchSchema.parse(searchParamsToObject(req.url));
    return searchProvider.globalSearch(q, limit);
  });
}
