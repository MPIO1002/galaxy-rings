"use client";

import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  orderSchema,
  OrderFormData,
} from "../schemas/orderSchema";

export interface UseOrderReturn {
  register: UseFormRegister<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleSubmit: (productId: number, colorId: number, size: number) => void;
  reset: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UseOrderOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

/**
 * Payload gửi lên API = form data (fullName, email, phone, address)
 * + 3 tham số cấu hình sản phẩm được truyền vào lúc submit.
 */
interface OrderPayload extends OrderFormData {
  productId: number;
  colorId: number;
  size: number;
}

/**
 * Gửi đơn hàng lên API.
 * Tách thành hàm độc lập để dễ test và tái sử dụng.
 */
async function postOrder(payload: OrderPayload): Promise<void> {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message ?? "Đặt hàng thất bại. Vui lòng thử lại.");
  }
}

/**
 * Hook quản lý form đặt hàng với React Hook Form + Zod và TanStack Query useMutation.
 *
 * Điểm khác biệt so với useSubscribe:
 * - handleSubmit nhận thêm (productId, colorId, size) — các giá trị này
 *   không phải field nhập tay mà đến từ bộ chọn màu/size trong BuySection,
 *   nên được merge vào payload ngay trong lúc mutate().
 */
export function useOrder(options: UseOrderOptions = {}): UseOrderReturn {
  const { onSuccess, onError } = options;

  // ─── React Hook Form ──────────────────────────────────────────────────────
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { fullName: "", email: "", phone: "", address: "" },
    mode: "onTouched",
  });

  // ─── TanStack Query Mutation ──────────────────────────────────────────────
  const mutation = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (err: Error) => {
      onError?.(
        err.message ?? "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
      );
    },
  });

  // ─── Submit handler ───────────────────────────────────────────────────────
  // Nhận thêm 3 tham số từ bộ chọn sản phẩm bên ngoài form.
  // RHF chỉ gọi callback này sau khi tất cả validation Zod đã pass.
  const handleSubmit = (productId: number, colorId: number, size: number) =>
    form.handleSubmit((data) => {
      mutation.mutate({ ...data, productId, colorId, size });
    })();

  // ─── Reset ────────────────────────────────────────────────────────────────
  const reset = () => {
    form.reset();
    mutation.reset();
  };

  return {
    // RHF helpers
    register: form.register,
    errors: form.formState.errors,

    // Mutation state
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,

    // Handlers
    handleSubmit,
    reset,
  };
}
