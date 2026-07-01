"use client";

import { useState } from "react";
import {
  orderSchema,
  OrderFormData,
  OrderFormErrors,
} from "../schemas/orderSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface UseOrderOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

interface UseOrderReturn {
  formData: OrderFormData;
  errors: OrderFormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (productId: number, colorId: number, size: number) => Promise<void>;
  reset: () => void;
}

const initialFormData: OrderFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
};

/**
 * Hook managing the order form state, Zod validation, and API call.
 * Accepts optional onSuccess / onError callbacks for side-effects like toasts.
 */
export function useOrder(options: UseOrderOptions = {}): UseOrderReturn {
  const { onSuccess, onError } = options;

  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [errors, setErrors] = useState<OrderFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user types
    if (errors[name as keyof OrderFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (productId: number, colorId: number, size: number) => {
    // Zod client-side validation
    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: OrderFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof OrderFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          productId,
          colorId,
          size,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message ?? "Đặt hàng thất bại. Vui lòng thử lại.");
      }

      setIsSuccess(true);
      setFormData(initialFormData);
      onSuccess?.();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.";
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setFormData(initialFormData);
    setErrors({});
  };

  return { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit, reset };
}
