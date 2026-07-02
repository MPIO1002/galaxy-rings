import { z } from "zod";

const vietnamesePhoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;

/**
 * Zod schema for the order form.
 * Mirrors the backend validation rules in OrderService.
 */
export const orderSchema = z.object({
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

  address: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập địa chỉ giao hàng")
    .min(5, "Địa chỉ quá ngắn (tối thiểu 5 ký tự)")
    .max(500, "Địa chỉ quá dài (tối đa 500 ký tự)"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
export type OrderFormErrors = Partial<Record<keyof OrderFormData, string>>;
