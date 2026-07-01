import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to protect routes that require admin authentication.
 * Verifies the JWT Bearer token in the Authorization header.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Truy cập bị từ chối. Vui lòng đăng nhập."
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("Critical: JWT_SECRET is not defined in environment.");
    res.status(500).json({
      success: false,
      message: "Lỗi cấu hình máy chủ."
    });
    return;
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại."
    });
  }
};
