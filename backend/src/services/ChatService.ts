import { GoogleGenerativeAI } from "@google/generative-ai";

export class ChatService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // We will initialize this safely even if GEMINI_API_KEY is not yet present
    const apiKey = process.env.GEMINI_API_KEY || "";
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    // Configure the model with the system instruction
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "Bạn là trợ lý AI chuyên tư vấn về sản phẩm Samsung Galaxy Ring. Bạn CHỈ trả lời các câu hỏi liên quan đến Galaxy Ring, thiết kế, tính năng sức khỏe (nhịp tim, giấc ngủ, Energy Score), giá bán, pin. Nếu người dùng hỏi về các chủ đề khác ngoài Galaxy Ring, hãy NÓI ĐÚNG CÂU SAU VÀ KHÔNG GIẢI THÍCH THÊM: 'Tôi chỉ có thể trả lời các câu hỏi liên quan đến Galaxy Ring'. Luôn trả lời ngắn gọn, thân thiện và bằng tiếng Việt.",
    });
  }

  public async getResponse(message: string, history: any[] = []): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
      return "Hệ thống chưa được cấu hình API Key cho Chatbot. Xin vui lòng liên hệ quản trị viên.";
    }

    try {
      // In a more advanced version, we could use startChat() with history.
      // For this basic version, we will just send the latest message, or use startChat if history is provided.
      const chat = this.model.startChat({
        history: history.map((msg: any) => ({
          role: msg.role === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(message);
      return result.response.text();
    } catch (error: any) {
      console.error("ChatService Error:", error);
      return "Xin lỗi, hiện tại tôi không thể kết nối đến hệ thống AI. Vui lòng thử lại sau.";
    }
  }
}
