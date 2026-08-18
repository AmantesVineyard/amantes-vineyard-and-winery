import { handleApi } from "@/lib/api";
import { getCategoryTree } from "@/services/category-service";

export async function GET() {
  return handleApi(async () => getCategoryTree());
}
