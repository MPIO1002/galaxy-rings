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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/admin/TableSkeleton";
import TableError from "@/components/admin/TableError";
import TableEmpty from "@/components/admin/TableEmpty";
import { formatDate } from "@/lib/formatDate";

interface Order {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  productId: number;
  colorId: number;
  size: number;
  createdAt: string;
}

const COLOR_MAP: Record<number, { name: string; hex: string }> = {
  1: { name: "Đen Titanium", hex: "#232426" },
  2: { name: "Vàng Titanium", hex: "#e5c158" },
  3: { name: "Bạc Titanium", hex: "#e5e5e7" },
};



export default function OrdersTable() {
  const { data, pagination, isLoading, error, fetchPage } =
    useAdminData<Order>("/api/orders", "data", 10);

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
    return <TableEmpty message="Chưa có đơn hàng nào" />;
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold">Họ tên</TableHead>
              <TableHead className="font-bold">SĐT</TableHead>
              <TableHead className="font-bold hidden md:table-cell">Email</TableHead>
              <TableHead className="font-bold hidden lg:table-cell">Địa chỉ</TableHead>
              <TableHead className="font-bold">Màu</TableHead>
              <TableHead className="font-bold w-[70px]">Size</TableHead>
              <TableHead className="font-bold hidden sm:table-cell">Ngày đặt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => {
              const color = COLOR_MAP[order.colorId];
              return (
                <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{order.fullName}</TableCell>
                  <TableCell className="text-sm">{order.phone}</TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                    {order.email}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">
                    {order.address}
                  </TableCell>
                  <TableCell>
                    {color ? (
                      <Badge variant="outline" className="gap-1.5 font-medium">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-border inline-block"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">ID: {order.colorId}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono font-bold">
                      {order.size}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                    {formatDate(order.createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Trang {pagination.pageIndex} / {pagination.totalPages} · Tổng {pagination.totalItems} đơn
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
