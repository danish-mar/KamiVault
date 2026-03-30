"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { authenticator } = require('otplib');
const qrcode_1 = __importDefault(require("qrcode"));
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'kamivault-secret-key';
    }
    async register(userData) {
        const existingUser = await User_1.default.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const user = new User_1.default(userData);
        return await user.save();
    }
    async generate2FA(user) {
        const secret = authenticator.generateSecret();
        const otpauth = authenticator.keyuri(user.email, 'KamiVault', secret);
        const qrCodeUrl = await qrcode_1.default.toDataURL(otpauth);
        user.twoFactorSecret = secret;
        await user.save();
        return { secret, qrCodeUrl };
    }
    verify2FA(token, secret) {
        return authenticator.verify({ token, secret });
    }
    async login(email, password) {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return null;
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return null;
        if (user.is2FAEnabled) {
            return { user, requires2FA: true };
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, twoFactorVerified: false }, this.JWT_SECRET, { expiresIn: '1d' });
        return { user, token, requires2FA: false };
    }
    generateToken(user, twoFactorVerified = false) {
        return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, twoFactorVerified }, this.JWT_SECRET, { expiresIn: '1d' });
    }
    async getUserById(id) {
        const user = await User_1.default.findById(id);
        if (!user)
            throw new Error('User not found');
        return user;
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
