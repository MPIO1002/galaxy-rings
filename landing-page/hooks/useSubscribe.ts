"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  subscribeSchema,
  SubscribeFormData,
} from "../schemas/subscribeSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface UseSubscribeOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

/**
 * Sends subscribe form data to the API.
 * Extracted as a plain async function so it's easy to test independently.
 */
async function postSubscribe(data: SubscribeFormData): Promise<void> {
  const response = await fetch(`${API_URL}/api/subscribers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    // Throw an Error so useMutation can catch it and put it in `error`
    throw new Error(json.message ?? "Đăng ký thất bại. Vui lòng thử lại.");
  }
}

/**
 * Hook managing the subscribe form with React Hook Form + Zod validation
 * and TanStack Query useMutation for the API call.
 *
 * What changed vs. the old useSubscribe:
 * - formData / handleChange state → replaced by RHF's register()
 * - Manual Zod parsing in handleSubmit → zodResolver handles it automatically
 * - isSubmitting useState → mutation.isPending from useMutation
 * - isSuccess useState → mutation.isSuccess from useMutation
 * - Manual try/catch in handleSubmit → useMutation's onSuccess/onError callbacks
 */
export function useSubscribe(options: UseSubscribeOptions = {}) {
  const { onSuccess, onError } = options;

  // ─── React Hook Form ────────────────────────────────────────────────────────
  // zodResolver connects the Zod schema to RHF so field-level validation runs
  // automatically on submit (or on blur/change depending on `mode`).
  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { fullName: "", email: "", phone: "" },
    mode: "onTouched", // validate a field once the user has touched and left it
  });

  // ─── TanStack Query Mutation ─────────────────────────────────────────────────
  // useMutation manages the async POST lifecycle: idle → pending → success/error.
  // No more manual isSubmitting or try/catch needed.
  const mutation = useMutation({
    mutationFn: postSubscribe,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (err: Error) => {
      onError?.(err.message ?? "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    },
  });

  // ─── Form submit handler ─────────────────────────────────────────────────────
  // RHF calls this only after all validations pass; `data` is already type-safe.
  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  // ─── Reset ──────────────────────────────────────────────────────────────────
  // Resets both RHF state and the mutation state back to their initial values.
  const reset = () => {
    form.reset();
    mutation.reset();
  };

  return {
    // RHF helpers used in the component
    register: form.register,
    errors: form.formState.errors,

    // Mutation state (replaces old isSubmitting / isSuccess useState)
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,

    // Handlers
    handleSubmit,
    reset,
  };
}
