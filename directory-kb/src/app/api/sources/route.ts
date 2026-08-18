import { handleApi } from "@/lib/api";
import { listSourceDocuments } from "@/services/source-service";

export async function GET() {
  return handleApi(async () => listSourceDocuments());
}
