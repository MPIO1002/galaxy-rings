import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Database } from "./config/Database";
import { createOrderRoutes } from "./routes/orderRoutes";
import { createSubscriberRoutes } from "./routes/subscriberRoutes";
import { createAuthRoutes } from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing middlewares
app.use(cors());
app.use(express.json());

// Initialize Database connection pool and schema
let db: Database;
try {
  db = new Database();
  console.log("Database layer initialized successfully.");
} catch (error) {
  console.error("Critical: Failed to initialize database connection pool", error);
  process.exit(1);
}


// Mount routes with dependencies injected
app.use("/api", createAuthRoutes());
app.use("/api", createOrderRoutes(db));
app.use("/api", createSubscriberRoutes(db));

// Root route for health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Global error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled global server error:", err);
  res.status(500).json({
    success: false,
    message: "Đã xảy ra lỗi hệ thống nghiêm trọng."
  });
});

// Start listening
const server = app.listen(PORT, () => {
  console.log(`Order and Subscriber services are running in dev mode on http://localhost:${PORT}`);
});

// Graceful shutdown handling
const gracefulShutdown = async () => {
  console.log("Starting graceful shutdown of backend services...");
  server.close(async () => {
    console.log("HTTP server closed.");
    try {
      await db.close();
      console.log("Graceful shutdown completed successfully.");
      process.exit(0);
    } catch (err) {
      console.error("Error closing database connections during shutdown:", err);
      process.exit(1);
    }
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
