import { OrderRepository, IOrderInput, IOrder } from "../repositories/OrderRepository";

export class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  /**
   * Processes and registers a new customer order.
   * @param orderInput Data for the order
   */
  public async processOrder(orderInput: IOrderInput): Promise<IOrder> {
    this.validateOrderInput(orderInput);
    
    try {
      return await this.orderRepository.createOrder(orderInput);
    } catch (error) {
      console.error("Error creating order in Service layer:", error);
      throw new Error("Không thể lưu thông tin đơn hàng vào cơ sở dữ liệu");
    }
  }

  /**
   * Retrieves orders with pagination.
   * @param pageIndexVal Raw pageIndex query
   * @param pageSizeVal Raw pageSize query
   */
  public async getPaginatedOrders(pageIndexVal: any, pageSizeVal: any): Promise<{
    orders: IOrder[];
    pagination: {
      totalItems: number;
      totalPages: number;
      pageIndex: number;
      pageSize: number;
    }
  }> {
    let pageIndex = parseInt(pageIndexVal, 10);
    let pageSize = parseInt(pageSizeVal, 10);

    // Provide default fallback values if parameters are not provided or invalid
    if (isNaN(pageIndex) || pageIndex < 1) {
      pageIndex = 1;
    }
    if (isNaN(pageSize) || pageSize < 1) {
      pageSize = 10;
    }
    // Prevent query requesting too many rows (DDoS protection)
    if (pageSize > 100) {
      pageSize = 100;
    }

    const limit = pageSize;
    const offset = (pageIndex - 1) * pageSize;

    try {
      const { orders, total } = await this.orderRepository.getOrders(limit, offset);
      const totalPages = Math.ceil(total / pageSize);

      return {
        orders,
        pagination: {
          totalItems: total,
          totalPages,
          pageIndex,
          pageSize
        }
      };
    } catch (error) {
      console.error("Error retrieving orders in Service layer:", error);
      throw new Error("Không thể truy vấn danh sách đơn hàng");
    }
  }

  /**
   * Validates input parameters for creating an order.
   * Throws an error with validation message if invalid.
   */
  private validateOrderInput(input: IOrderInput): void {
    const { fullName, phone, email, address, productId, colorId, size } = input;

    // 1. Strict Type Checking (Defends against array/object payloads injection)
    if (typeof fullName !== "string") {
      throw new Error("Họ và tên phải là chuỗi ký tự");
    }
    if (typeof email !== "string") {
      throw new Error("Email phải là chuỗi ký tự");
    }
    if (typeof phone !== "string") {
      throw new Error("Số điện thoại phải là chuỗi ký tự");
    }
    if (typeof address !== "string") {
      throw new Error("Địa chỉ giao hàng phải là chuỗi ký tự");
    }
    if (typeof productId !== "number" || isNaN(productId)) {
      throw new Error("Mã sản phẩm phải là kiểu số");
    }
    if (typeof colorId !== "number" || isNaN(colorId)) {
      throw new Error("Mã màu sắc phải là kiểu số");
    }
    if (typeof size !== "number" || isNaN(size)) {
      throw new Error("Kích cỡ nhẫn phải là kiểu số");
    }

    // 2. Full Name validations
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      throw new Error("Họ và tên không được để trống");
    }
    if (trimmedName.length < 2) {
      throw new Error("Họ và tên quá ngắn (tối thiểu 2 ký tự)");
    }
    if (trimmedName.length > 100) {
      throw new Error("Họ và tên vượt quá độ dài cho phép (tối đa 100 ký tự)");
    }

    // 3. Email validations
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      throw new Error("Email không được để trống");
    }
    if (trimmedEmail.length > 100) {
      throw new Error("Email vượt quá độ dài cho phép (tối đa 100 ký tự)");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error("Định dạng email không hợp lệ");
    }

    // 4. Phone validations
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      throw new Error("Số điện thoại không được để trống");
    }
    if (trimmedPhone.length > 20) {
      throw new Error("Số điện thoại quá dài (tối đa 20 ký tự)");
    }
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    const sanitizedPhone = trimmedPhone.replace(/\s+/g, "");
    if (!phoneRegex.test(sanitizedPhone)) {
      throw new Error("Số điện thoại không đúng định dạng (ví dụ: 0912345678)");
    }

    // 5. Address validations
    const trimmedAddress = address.trim();
    if (!trimmedAddress) {
      throw new Error("Địa chỉ giao hàng không được để trống");
    }
    if (trimmedAddress.length < 5) {
      throw new Error("Địa chỉ quá ngắn (tối thiểu 5 ký tự)");
    }
    if (trimmedAddress.length > 500) {
      throw new Error("Địa chỉ quá dài (tối đa 500 ký tự)");
    }

    // 6. Product ID validations
    if (productId <= 0) {
      throw new Error("Mã sản phẩm phải lớn hơn 0");
    }

    // 7. Color ID validations
    if (colorId <= 0) {
      throw new Error("Mã màu sắc phải lớn hơn 0");
    }

    // 8. Size validations
    if (size < 1 || size > 30) {
      throw new Error("Kích cỡ nhẫn không hợp lệ (phải từ 1 đến 30)");
    }
  }
}
