import { Request, Response } from "express";
import { SubscriberService } from "../services/SubscriberService";

export class SubscriberController {
  private subscriberService: SubscriberService;

  constructor(subscriberService: SubscriberService) {
    this.subscriberService = subscriberService;
  }

  /**
   * HTTP POST handler to create a subscription.
   */
  public handleCreateSubscriber = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullName, email, phone } = req.body;

      const newSubscriber = await this.subscriberService.processSubscription({
        fullName,
        email,
        phone
      });

      res.status(201).json({
        success: true,
        message: "Đăng ký nhận tin thành công!",
        data: newSubscriber
      });
    } catch (error: any) {
      console.warn("Bad Request at SubscriberController.handleCreateSubscriber:", error.message);
      
      res.status(400).json({
        success: false,
        message: error.message || "Đăng ký nhận tin thất bại."
      });
    }
  };

  /**
   * HTTP GET handler to list paginated subscribers.
   */
  public handleGetSubscribers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { pageIndex, pageSize } = req.query;

      const result = await this.subscriberService.getPaginatedSubscribers(pageIndex, pageSize);

      res.status(200).json({
        success: true,
        data: result.subscribers,
        pagination: result.pagination
      });
    } catch (error: any) {
      console.error("Error at SubscriberController.handleGetSubscribers:", error.message);

      res.status(500).json({
        success: false,
        message: error.message || "Không thể truy vấn danh sách người đăng ký."
      });
    }
  };
}
