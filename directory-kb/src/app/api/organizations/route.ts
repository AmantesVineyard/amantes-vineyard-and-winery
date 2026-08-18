import { NextRequest } from "next/server";
import { handleApi, searchParamsToObject } from "@/lib/api";
import { organizationFiltersSchema } from "@/lib/validation";
import { listOrganizations, searchOrganizationsByName } from "@/services/organization-service";

export async function GET(req: NextRequest) {
  return handleApi(async () => {
    const params = searchParamsToObject(req.url);
    if (params.lookup) {
      return searchOrganizationsByName(params.lookup, 10);
    }
    const filters = organizationFiltersSchema.parse(params);
    return listOrganizations(filters);
  });
}
