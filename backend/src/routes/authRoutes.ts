import { Router } from "express";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";

/**
 * Factory function to create auth routes.
 */
export function createAuthRoutes(): Router {
  const router = Router();

  const authService = new AuthService();
  const authController = new AuthController(authService);

  // POST /api/auth/login
  router.post("/auth/login", authController.handleLogin);

  return router;
}
