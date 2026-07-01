import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * HTTP POST handler for admin login.
   * Expects { username, password } in request body.
   */
  public handleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;

      if (typeof username !== "string" || typeof password !== "string") {
        res.status(400).json({
          success: false,
          message: "Tên đăng nhập và mật khẩu phải là chuỗi ký tự."
        });
        return;
      }

      const token = await this.authService.login(username, password);

      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công.",
        token
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Đăng nhập thất bại."
      });
    }
  };
}
