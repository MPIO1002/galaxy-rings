import { z } from "zod";

const vietnamesePhoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;

/**
 * Zod schema for the subscriber form.
 * Mirrors the backend validation rules in SubscriberService.
 */
export const subscribeSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập họ và tên")
    .min(2, "Họ và tên quá ngắn (tối thiểu 2 ký tự)")
    .max(100, "Họ và tên quá dài (tối đa 100 ký tự)"),

  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .max(100, "Email quá dài (tối đa 100 ký tự)")
    .email("Email không hợp lệ"),

  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại")
    .max(20, "Số điện thoại quá dài")
    .transform((val) => val.replace(/\s+/g, ""))
    .refine(
      (val) => vietnamesePhoneRegex.test(val),
      "Số điện thoại không đúng định dạng (VD: 0912345678)"
    ),
});

export type SubscribeFormData = z.input<typeof subscribeSchema>;
export type SubscribeFormErrors = Partial<Record<keyof SubscribeFormData, string>>;
