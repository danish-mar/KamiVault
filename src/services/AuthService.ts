import jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';   // ✅ direct named import
import QRCode from 'qrcode';              // ✅ clean default import
import User, { IUser } from '../models/User';

export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'kamivault-secret-key';

    async register(userData: Partial<IUser>): Promise<IUser> {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const user = new User(userData);
        return await user.save();
    }

    async generate2FA(user: IUser) {
        const email = user.email || 'user@kamivault.com';
        const secret = authenticator.generateSecret();
        const otpauth = authenticator.keyuri(email, 'KamiVault', secret); // ✅ works now

        const qrCodeUrl = await QRCode.toDataURL(otpauth); // ✅ promise-based, no callback needed

        user.twoFactorSecret = secret;
        await user.save();

        return { secret, qrCodeUrl };
    }

    verify2FA(token: string, secret: string): boolean {
        return authenticator.verify({ token, secret });
    }

    async login(email: string, password: string): Promise<{ user: IUser; token?: string; requires2FA: boolean } | null> {
        const user = await User.findOne({ email });
        if (!user) return null;

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return null;

        if (user.is2FAEnabled) {
            return { user, requires2FA: true };
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, twoFactorVerified: false },
            this.JWT_SECRET,
            { expiresIn: '1d' }
        );
        return { user, token, requires2FA: false };
    }

    generateToken(user: IUser, twoFactorVerified: boolean = false): string {
        return jwt.sign(
            { id: user._id, email: user.email, twoFactorVerified },
            this.JWT_SECRET,
            { expiresIn: '1d' }
        );
    }

    async getUserById(id: string): Promise<IUser> {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }
}

export const authService = new AuthService();