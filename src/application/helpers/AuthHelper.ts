import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import appConfig from '../../config/config';
import { User } from '../../data/models/User';
import { plainToClass } from 'class-transformer';

class AuthHelper {

  // BCrypt Hash
  public static hashPassword = async (rawPassword: string) => {
    return await bcrypt.hash(rawPassword, 10);
  }

  // Check password matching
  public static isPasswordMatched(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  // Sign JWT token
  public static async sign(payload: any) {
    return await jwt.sign(payload, appConfig.app.jwt);
  }

  // Verify JWT token
  public static async verify (token: string): Promise<User> {
    return await plainToClass(User, jwt.verify(token, appConfig.app.jwt));
  }

}

export default AuthHelper;