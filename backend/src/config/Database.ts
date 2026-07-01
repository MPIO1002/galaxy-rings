import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  private pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is missing!");
    }

    this.pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false // Required for serverless database connections like Neon
      }
    });

    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle PostgreSQL client", err);
    });
  }

  /**
   * Executes a database query using the pool connection.
   * @param text SQL query string
   * @param params Query parameters
   */
  public async query(text: string, params?: any[]): Promise<QueryResult> {
    try {
      return await this.pool.query(text, params);
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  /**
   * Closes the database pool connection gracefully.
   */
  public async close(): Promise<void> {
    await this.pool.end();
    console.log("Database connection pool closed successfully.");
  }
}
