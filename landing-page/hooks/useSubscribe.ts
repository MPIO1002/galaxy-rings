"use client";

import { useState } from "react";
import {
  subscribeSchema,
  SubscribeFormData,
  SubscribeFormErrors,
} from "../schemas/subscribeSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface UseSubscribeOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

interface UseSubscribeReturn {
  formData: SubscribeFormData;
  errors: SubscribeFormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

const initialFormData: SubscribeFormData = {
  fullName: "",
  email: "",
  phone: "",
};

/**
 * Hook managing the subscribe form state, Zod validation, and API call.
 * Accepts optional onSuccess / onError callbacks for side-effects like toasts.
 */
export function useSubscribe(options: UseSubscribeOptions = {}): UseSubscribeReturn {
  const { onSuccess, onError } = options;

  const [formData, setFormData] = useState<SubscribeFormData>(initialFormData);
  const [errors, setErrors] = useState<SubscribeFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user types
    if (errors[name as keyof SubscribeFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Zod client-side validation
    const result = subscribeSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: SubscribeFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SubscribeFormData;
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
      const response = await fetch(`${API_URL}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message ?? "Đăng ký thất bại. Vui lòng thử lại.");
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

