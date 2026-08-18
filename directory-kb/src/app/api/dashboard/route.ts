import { handleApi } from "@/lib/api";
import { getDashboardMetrics } from "@/services/dashboard-service";

export async function GET() {
  return handleApi(async () => getDashboardMetrics());
}
