import { Router } from "express";
import { Database } from "../config/Database";
import { OrderRepository } from "../repositories/OrderRepository";
import { OrderService } from "../services/OrderService";
import { OrderController } from "../controllers/OrderController";

/**
 * Factory function to create and wire up order routes with dependencies.
 * @param db Database connection helper
 */
export function createOrderRoutes(db: Database): Router {
  const router = Router();

  // Wire up layered classes using Dependency Injection
  const orderRepository = new OrderRepository(db);
  const orderService = new OrderService(orderRepository);
  const orderController = new OrderController(orderService);

  // Route registration
  router.post("/orders", orderController.handleCreateOrder);
  router.get("/orders", orderController.handleGetOrders);

  return router;
}
