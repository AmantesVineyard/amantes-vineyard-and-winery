import { sql, ilike, or, asc } from "drizzle-orm";
import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function listContacts(opts: { q?: string; page?: number; pageSize?: number }) {
  const page = opts.page ?? 1;
  const pageSize = opts.pageSize ?? 50;

  const where = opts.q
    ? or(
        ilike(contacts.fullName, `%${opts.q}%`),
        sql`${contacts.fullName} % ${opts.q}`,
        ilike(contacts.email, `%${opts.q}%`),
        ilike(contacts.title, `%${opts.q}%`)
      )
    : undefined;

  const [rows, [{ count }]] = await Promise.all([
    db.query.contacts.findMany({
      where,
      with: { organization: { columns: { id: true, canonicalName: true } } },
      orderBy: [asc(contacts.fullName)],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }),
    db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(contacts)
      .where(where ?? sql`true`),
  ]);

  return { rows, total: count, page, pageSize };
}
