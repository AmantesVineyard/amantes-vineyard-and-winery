import { sql, eq, ilike, or, asc } from "drizzle-orm";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { getEvidenceForEntity } from "./source-service";

export async function listBrands(opts: { q?: string; page?: number; pageSize?: number }) {
  const page = opts.page ?? 1;
  const pageSize = opts.pageSize ?? 50;

  const where = opts.q
    ? or(ilike(brands.brandName, `%${opts.q}%`), sql`${brands.brandName} % ${opts.q}`)
    : undefined;

  const [rows, [{ count }]] = await Promise.all([
    db.query.brands.findMany({
      where,
      with: { owningOrganization: { columns: { id: true, canonicalName: true } } },
      orderBy: [asc(brands.brandName)],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }),
    db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(brands)
      .where(where ?? sql`true`),
  ]);

  return { rows, total: count, page, pageSize };
}

export async function getBrandDetail(id: string) {
  const brand = await db.query.brands.findFirst({
    where: eq(brands.id, id),
    with: { owningOrganization: { with: { locations: true } } },
  });
  if (!brand) return null;

  const [siblingBrands, evidence] = await Promise.all([
    brand.owningOrganizationId
      ? db.query.brands.findMany({
          where: sql`${brands.owningOrganizationId} = ${brand.owningOrganizationId} AND ${brands.id} <> ${id}`,
          orderBy: [asc(brands.brandName)],
        })
      : Promise.resolve([]),
    getEvidenceForEntity("brand", id),
  ]);

  return { ...brand, siblingBrands, evidence };
}
