/**
 * Format an ISO date string to Vietnamese locale date/time.
 * Uses Intl API with explicit timeZone — no manual offset needed.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
