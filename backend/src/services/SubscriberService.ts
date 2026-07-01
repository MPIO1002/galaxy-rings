import { SubscriberRepository, ISubscriberInput, ISubscriber } from "../repositories/SubscriberRepository";

export class SubscriberService {
  private subscriberRepository: SubscriberRepository;

  constructor(subscriberRepository: SubscriberRepository) {
    this.subscriberRepository = subscriberRepository;
  }

  /**
   * Registers a new subscriber.
   * @param input Subscriber data
   */
  public async processSubscription(input: ISubscriberInput): Promise<ISubscriber> {
    this.validateSubscriberInput(input);

    try {
      return await this.subscriberRepository.createSubscriber(input);
    } catch (error) {
      console.error("Error creating subscriber in Service layer:", error);
      throw new Error("Không thể đăng ký nhận tin lúc này. Vui lòng thử lại sau.");
    }
  }

  /**
   * Retrieves subscribers with pagination parameters.
   * @param pageIndexVal Raw pageIndex query
   * @param pageSizeVal Raw pageSize query
   */
  public async getPaginatedSubscribers(pageIndexVal: any, pageSizeVal: any): Promise<{
    subscribers: ISubscriber[];
    pagination: {
      totalItems: number;
      totalPages: number;
      pageIndex: number;
      pageSize: number;
    }
  }> {
    let pageIndex = parseInt(pageIndexVal, 10);
    let pageSize = parseInt(pageSizeVal, 10);

    if (isNaN(pageIndex) || pageIndex < 1) {
      pageIndex = 1;
    }
    if (isNaN(pageSize) || pageSize < 1) {
      pageSize = 10;
    }
    if (pageSize > 100) {
      pageSize = 100;
    }

    const limit = pageSize;
    const offset = (pageIndex - 1) * pageSize;

    try {
      const { subscribers, total } = await this.subscriberRepository.getSubscribers(limit, offset);
      const totalPages = Math.ceil(total / pageSize);

      return {
        subscribers,
        pagination: {
          totalItems: total,
          totalPages,
          pageIndex,
          pageSize
        }
      };
    } catch (error) {
      console.error("Error retrieving subscribers in Service layer:", error);
      throw new Error("Không thể truy vấn danh sách người đăng ký");
    }
  }

  /**
   * Strict validation logic for subscribers input.
   */
  private validateSubscriberInput(input: ISubscriberInput): void {
    const { fullName, email, phone } = input;

    // Type checking
    if (typeof fullName !== "string") {
      throw new Error("Họ và tên phải là chuỗi ký tự");
    }
    if (typeof email !== "string") {
      throw new Error("Email phải là chuỗi ký tự");
    }
    if (typeof phone !== "string") {
      throw new Error("Số điện thoại phải là chuỗi ký tự");
    }

    // Name check
    const trimmedName = fullName.trim();
    if (!trimmedName) {
      throw new Error("Họ và tên không được để trống");
    }
    if (trimmedName.length < 2) {
      throw new Error("Họ và tên quá ngắn (tối thiểu 2 ký tự)");
    }
    if (trimmedName.length > 100) {
      throw new Error("Họ và tên quá dài (tối đa 100 ký tự)");
    }

    // Email check
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      throw new Error("Email không được để trống");
    }
    if (trimmedEmail.length > 100) {
      throw new Error("Email quá dài (tối đa 100 ký tự)");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error("Định dạng email không hợp lệ");
    }

    // Phone check
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
  }
}
