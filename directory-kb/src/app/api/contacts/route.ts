import { NextRequest } from "next/server";
import { handleApi, searchParamsToObject } from "@/lib/api";
import { listContacts } from "@/services/contact-service";

export async function GET(req: NextRequest) {
  return handleApi(async () => {
    const p = searchParamsToObject(req.url);
    return listContacts({
      q: p.q,
      page: p.page ? Number(p.page) : undefined,
      pageSize: p.pageSize ? Number(p.pageSize) : undefined,
    });
  });
}
