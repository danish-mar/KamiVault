"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    async register(userData) {
        const existingUser = await User_1.default.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const user = new User_1.default(userData);
        return await user.save();
    }
    async login(email, password) {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return null;
        const isMatch = await user.comparePassword(password);
        return isMatch ? user : null;
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
