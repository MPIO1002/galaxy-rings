import { Router } from "express";
import { Database } from "../config/Database";
import { SubscriberRepository } from "../repositories/SubscriberRepository";
import { SubscriberService } from "../services/SubscriberService";
import { SubscriberController } from "../controllers/SubscriberController";
import { authenticate } from "../middleware/authenticate";

/**
 * Factory function to wire and create subscriber routes.
 * @param db Database instance
 */
export function createSubscriberRoutes(db: Database): Router {
  const router = Router();

  // Dependency injection wiring
  const subscriberRepository = new SubscriberRepository(db);
  const subscriberService = new SubscriberService(subscriberRepository);
  const subscriberController = new SubscriberController(subscriberService);

  // Endpoints
  router.post("/subscribers", subscriberController.handleCreateSubscriber);        // Public: anyone can subscribe
  router.get("/subscribers", authenticate, subscriberController.handleGetSubscribers); // Admin only

  return router;
}
