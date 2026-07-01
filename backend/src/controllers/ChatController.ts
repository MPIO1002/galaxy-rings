import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  public handleChat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        res.status(400).json({ success: false, message: "Yêu cầu phải có tin nhắn." });
        return;
      }

      const reply = await this.chatService.getResponse(message, history || []);
      
      res.status(200).json({
        success: true,
        reply,
      });
    } catch (error) {
      console.error("Lỗi trong ChatController:", error);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ." });
    }
  };
}
