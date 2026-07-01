import { Database } from "../config/Database";

export interface ISubscriberInput {
  fullName: string;
  email: string;
  phone: string;
}

export interface ISubscriber {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export class SubscriberRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  /**
   * Inserts a new subscriber into the database.
   * @param subscriber Subscriber data
   */
  public async createSubscriber(subscriber: ISubscriberInput): Promise<ISubscriber> {
    const sql = `
      INSERT INTO subscribers (full_name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING id, full_name AS "fullName", email, phone, created_at AS "createdAt"
    `;

    const params = [
      subscriber.fullName,
      subscriber.email,
      subscriber.phone
    ];

    const result = await this.db.query(sql, params);
    return result.rows[0] as ISubscriber;
  }

  /**
   * Retrieves a paginated list of subscribers.
   * @param limit Pagination limit
   * @param offset Pagination offset
   */
  public async getSubscribers(limit: number, offset: number): Promise<{ subscribers: ISubscriber[]; total: number }> {
    const countSql = `SELECT COUNT(*) FROM subscribers`;
    const dataSql = `
      SELECT id, full_name AS "fullName", email, phone, created_at AS "createdAt"
      FROM subscribers
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countResult = await this.db.query(countSql);
    const total = parseInt(countResult.rows[0].count, 10);

    const dataResult = await this.db.query(dataSql, [limit, offset]);

    return {
      subscribers: dataResult.rows as ISubscriber[],
      total
    };
  }
}
