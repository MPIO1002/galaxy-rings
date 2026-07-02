import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  /**
   * HTTP POST handler to create a new order.
   */
  public handleCreateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullName, phone, email, address, productId, colorId, size } = req.body;

      const newOrder = await this.orderService.processOrder({
        fullName,
        phone,
        email,
        address,
        productId: Number(productId),
        colorId: Number(colorId),
        size: Number(size)
      });

      // --- Discord Webhook logic ---
      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (webhookUrl) {
        const vnTime = new Date().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          dateStyle: "full",
          timeStyle: "medium",
        });

        const discordMessage = {
          content: `🛒 **CÓ ĐƠN ĐẶT HÀNG MỚI!**\n\n> 👤 **Khách hàng:** \`${fullName}\`\n> 📧 **Email:** \`${email}\`\n> 📞 **SĐT:** \`${phone}\`\n> 📍 **Địa chỉ:** \`${address}\`\n> 💍 **Sản phẩm:** \`ID: ${productId} | Màu: ${colorId} | Size: ${size}\`\n> 🕒 **Thời gian:** *${vnTime}*\n\n🔥 *Vui lòng liên hệ khách hàng để xác nhận đơn!*`
        };

        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discordMessage),
        }).catch((err) => console.error("Lỗi kết nối tới Discord:", err));
      }
      // -----------------------------

      res.status(201).json({
        success: true,
        message: "Đặt hàng thành công!",
        data: newOrder
      });
    } catch (error: any) {
      console.warn("Bad Request at OrderController.handleCreateOrder:", error.message);
      
      res.status(400).json({
        success: false,
        message: error.message || "Đặt hàng thất bại. Vui lòng kiểm tra lại thông tin."
      });
    }
  };

  /**
   * HTTP GET handler to retrieve a list of paginated orders.
   */
  public handleGetOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const { pageIndex, pageSize } = req.query;

      const result = await this.orderService.getPaginatedOrders(pageIndex, pageSize);

      res.status(200).json({
        success: true,
        data: result.orders,
        pagination: result.pagination
      });
    } catch (error: any) {
      console.error("Error at OrderController.handleGetOrders:", error.message);
      
      res.status(500).json({
        success: false,
        message: error.message || "Không thể truy vấn danh sách đơn hàng."
      });
    }
  };
}
