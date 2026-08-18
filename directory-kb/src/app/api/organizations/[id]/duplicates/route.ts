import { NextRequest } from "next/server";
import { handleApi } from "@/lib/api";
import { getOrganizationDetail } from "@/services/organization-service";
import { findDuplicates } from "@/services/duplicate-service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleApi(async () => {
    const { id } = await params;
    const org = await getOrganizationDetail(id);
    if (!org) return null;
    const primary = org.locations.find((l) => l.isPrimary) ?? org.locations[0];
    return findDuplicates({
      name: org.canonicalName,
      website: org.website,
      phone: org.mainPhone,
      city: primary?.city,
      excludeOrganizationId: id,
    });
  });
}
