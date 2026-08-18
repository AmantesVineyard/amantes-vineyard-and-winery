import { NextResponse } from "next/server";
import { ZodError } from "zod";

/** Uniform JSON error handling for route handlers. */
export async function handleApi<T>(fn: () => Promise<T>): Promise<NextResponse> {
  try {
    const data = await fn();
    if (data === null || data === undefined) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 }
      );
    }
    const message = err instanceof Error ? err.message : "Internal error";
    const status = /not found/i.test(message)
      ? 404
      : /already|cannot|confirm/i.test(message)
        ? 409
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export function searchParamsToObject(url: string): Record<string, string> {
  const params = new URL(url).searchParams;
  const obj: Record<string, string> = {};
  params.forEach((v, k) => {
    if (v !== "") obj[k] = v;
  });
  return obj;
}
