"use client";

import { useOrder } from "@/hooks/useOrder";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { COLORS, PRODUCTS } from "@/constants/buyData";
import { track } from "@vercel/analytics";

interface OrderModalProps {
  onClose: () => void;
  selectedColor: number | null;
  selectedSize: number | null;
}

export default function OrderModal({
  onClose,
  selectedColor,
  selectedSize,
}: OrderModalProps) {
  const product = PRODUCTS[0];
  const selectedColorObj = COLORS.find((c) => c.id === selectedColor);

  const { showToast, dismissToast, toasts } = useToast();

  const { register, errors, isSubmitting, isSuccess, handleSubmit } = useOrder({
    onSuccess: () =>
      showToast(
        "Đặt hàng thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.",
        "success"
      ),
    onError: (msg) => showToast(msg, "error"),
  });

  const onSubmitOrder = () => {
    track("click_buy_section_confirm_order");
    if (!selectedColor || !selectedSize) return;
    handleSubmit(product.id, selectedColor, selectedSize);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-opacity duration-300"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl animate-[modalSlideUp_0.35s_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-zinc-950 text-white px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
                  Xác nhận đơn hàng
                </p>
                <h3 className="text-xl font-black tracking-tight">Galaxy Ring</h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center cursor-pointer transition active:scale-95"
                aria-label="Đóng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Order Summary */}
            <div className="flex items-center gap-4 mt-4 bg-white/5 rounded-2xl p-4 border border-white/10">
              <div
                className="w-10 h-10 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                style={{ backgroundColor: selectedColorObj?.hex ?? "#232426" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">
                  {selectedColorObj?.name ?? "Đen Titanium"} · Size{" "}
                  {selectedSize ?? "—"}
                </p>
                <p className="text-xs text-zinc-400">Samsung Galaxy Ring Titanium</p>
              </div>
              <span className="text-sm font-extrabold text-white whitespace-nowrap">
                {product.basePrice.toLocaleString("vi-VN")}₫
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
            {isSuccess ? (
              /* Success State */
              <div className="flex flex-col items-center text-center py-6 animate-[fadeIn_0.4s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-500 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Đặt hàng thành công!
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Cảm ơn bạn đã đặt mua Galaxy Ring. Chúng tôi sẽ liên hệ xác
                  nhận đơn hàng qua điện thoại trong thời gian sớm nhất.
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-black text-white font-bold text-sm hover:bg-zinc-900 transition-all cursor-pointer active:scale-[0.98]"
                >
                  Đóng
                </button>
              </div>
            ) : (
              /* Order Form */
              <div className="space-y-5">
                <p className="text-xs text-zinc-400 font-medium">
                  Vui lòng điền thông tin để hoàn tất đặt hàng. Tất cả trường đều
                  bắt buộc.
                </p>

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="order-fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="order-fullName"
                    placeholder="Nguyễn Văn A"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.fullName
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                    }`}
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="order-email"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2"
                  >
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    id="order-email"
                    placeholder="name@company.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="order-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="order-phone"
                    placeholder="0912345678"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.phone
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                    }`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="order-address"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2"
                  >
                    Địa chỉ giao hàng
                  </label>
                  <input
                    type="text"
                    id="order-address"
                    placeholder="123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 rounded-xl bg-zinc-50 border text-sm text-black placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.address
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20"
                    }`}
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={onSubmitOrder}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 select-none shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-zinc-300 text-zinc-500 cursor-not-allowed shadow-none"
                      : "bg-black text-white hover:bg-zinc-900 active:scale-[0.99] hover:scale-[1.01] shadow-black/10"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-zinc-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    "Xác nhận đặt hàng"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
