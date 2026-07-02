"use client";

import { useEffect } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/admin/TableSkeleton";
import TableError from "@/components/admin/TableError";
import TableEmpty from "@/components/admin/TableEmpty";
import { formatDate } from "@/lib/formatDate";

interface Subscriber {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}



export default function SubscribersTable() {
  const { data, pagination, isLoading, error, fetchPage } =
    useAdminData<Subscriber>("/api/subscribers", "data", 10);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  if (isLoading && data.length === 0) {
    return <TableSkeleton />;
  }

  if (error) {
    return <TableError message={error} onRetry={() => fetchPage(1)} />;
  }

  if (data.length === 0) {
    return <TableEmpty message="Chưa có đăng ký nào" />;
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold">Họ tên</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">SĐT</TableHead>
              <TableHead className="font-bold">Ngày đăng ký</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((subscriber) => (
              <TableRow key={subscriber.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{subscriber.fullName}</TableCell>
                <TableCell className="text-sm">{subscriber.email}</TableCell>
                <TableCell className="text-sm">{subscriber.phone}</TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatDate(subscriber.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Trang {pagination.pageIndex} / {pagination.totalPages} · Tổng {pagination.totalItems} đăng ký
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.pageIndex <= 1 || isLoading}
              onClick={() => fetchPage(pagination.pageIndex - 1)}
              className="cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.pageIndex >= pagination.totalPages || isLoading}
              onClick={() => fetchPage(pagination.pageIndex + 1)}
              className="cursor-pointer"
            >
              Sau
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
