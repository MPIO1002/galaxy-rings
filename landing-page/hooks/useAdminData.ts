"use client";

import { useState, useCallback } from "react";
import { fetchWithAuth } from "@/lib/auth";

interface Pagination {
  totalItems: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}

interface UseAdminDataReturn<T> {
  data: T[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  fetchPage: (pageIndex?: number) => Promise<void>;
}

/**
 * Generic hook for fetching paginated admin data (orders or subscribers).
 * Handles loading state, pagination, and error handling with auth.
 *
 * @param endpoint API endpoint path (e.g., "/api/orders")
 * @param dataKey The key in the response JSON that contains the data array (e.g., "data")
 * @param pageSize Number of items per page
 */
export function useAdminData<T>(
  endpoint: string,
  dataKey: string = "data",
  pageSize: number = 10
): UseAdminDataReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    async (pageIndex: number = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(
          `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          const json = await response.json().catch(() => null);
          throw new Error(
            json?.message ?? `Lỗi khi tải dữ liệu (HTTP ${response.status})`
          );
        }

        const json = await response.json();
        setData(json[dataKey] ?? []);
        setPagination(json.pagination ?? null);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "Không thể kết nối đến máy chủ.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, dataKey, pageSize]
  );

  return { data, pagination, isLoading, error, fetchPage };
}
