import { Database } from "../config/Database";

export interface IOrderInput {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  productId: number;
  colorId: number;
  size: number;
}

export interface IOrder {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  productId: number;
  colorId: number;
  size: number;
  createdAt: Date;
}

export class OrderRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  /**
   * Inserts a new order into the database.
   * @param order The order data to insert
   */
  public async createOrder(order: IOrderInput): Promise<IOrder> {
    const sql = `
      INSERT INTO orders (full_name, phone, email, address, product_id, color_id, size)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, full_name AS "fullName", phone, email, address, product_id AS "productId", color_id AS "colorId", size, created_at AS "createdAt"
    `;

    const params = [
      order.fullName,
      order.phone,
      order.email,
      order.address,
      order.productId,
      order.colorId,
      order.size
    ];

    const result = await this.db.query(sql, params);
    return result.rows[0] as IOrder;
  }

  /**
   * Retrieves a paginated list of orders from the database.
   * @param limit Number of items to retrieve
   * @param offset Starting index of query
   */
  public async getOrders(limit: number, offset: number): Promise<{ orders: IOrder[]; total: number }> {
    const countSql = `SELECT COUNT(*) FROM orders`;
    const dataSql = `
      SELECT id, full_name AS "fullName", phone, email, address, product_id AS "productId", color_id AS "colorId", size, created_at AS "createdAt"
      FROM orders
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countResult = await this.db.query(countSql);
    const total = parseInt(countResult.rows[0].count, 10);

    const dataResult = await this.db.query(dataSql, [limit, offset]);
    
    return {
      orders: dataResult.rows as IOrder[],
      total
    };
  }
}
