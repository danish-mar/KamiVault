import User, { IUser } from '../models/User';

export class AuthService {
    async register(userData: Partial<IUser>): Promise<IUser> {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const user = new User(userData);
        return await user.save();
    }

    async login(email: string, password: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        if (!user) return null;

        const isMatch = await user.comparePassword(password);
        return isMatch ? user : null;
    }
}

export const authService = new AuthService();
