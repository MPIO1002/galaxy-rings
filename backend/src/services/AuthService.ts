import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  /**
   * Validates admin credentials and returns a signed JWT if correct.
   * Credentials are stored as environment variables (hashed password).
   */
  public async login(username: string, password: string): Promise<string> {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminUsername || !adminPasswordHash || !jwtSecret) {
      throw new Error("Cấu hình xác thực chưa được thiết lập.");
    }

    if (username !== adminUsername) {
      throw new Error("Tên đăng nhập hoặc mật khẩu không đúng.");
    }

    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    if (!isPasswordValid) {
      throw new Error("Tên đăng nhập hoặc mật khẩu không đúng.");
    }

    const token = jwt.sign(
      { username, role: "admin" },
      jwtSecret,
      { expiresIn: "8h" }
    );

    return token;
  }
}
