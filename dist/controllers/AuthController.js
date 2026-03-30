"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    renderLogin(req, res) {
        res.render('login', { error: null });
    }
    renderSignup(req, res) {
        res.render('signup', { error: null });
    }
    async handleSignup(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await AuthService_1.authService.register({ name, email, password });
            res.status(201).json({
                message: 'User created successfully',
                user: { id: user._id, name: user.name, email: user.email }
            });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async handleLogin(req, res) {
        try {
            const { email, password } = req.body;
            const result = await AuthService_1.authService.login(email, password);
            if (!result) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            if (result.requires2FA) {
                // @ts-ignore
                req.session.tempUserId = result.user._id;
                return res.json({ requires2FA: true, message: '2FA required' });
            }
            // @ts-ignore
            req.session.userId = result.user._id;
            // @ts-ignore
            req.session.userName = result.user.name;
            // @ts-ignore
            req.session.is2FAEnabled = result.user.is2FAEnabled;
            // @ts-ignore
            req.session.twoFactorVerified = false;
            if (!result.user.is2FAEnabled) {
                // If 2FA not enabled, we still require setup to access vault later
                // but for now let them in to the setup page
            }
            res.json({
                message: 'Login successful',
                ...result
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async setup2FA(req, res) {
        try {
            // @ts-ignore
            const userId = req.session.userId;
            const user = await AuthService_1.authService.generate2FA(await AuthService_1.authService.getUserById(userId));
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async verify2FASetup(req, res) {
        try {
            const { token } = req.body;
            // @ts-ignore
            const userId = req.session.userId;
            const user = await AuthService_1.authService.getUserById(userId);
            if (AuthService_1.authService.verify2FA(token, user.twoFactorSecret)) {
                user.is2FAEnabled = true;
                await user.save();
                // @ts-ignore
                req.session.twoFactorVerified = true;
                // @ts-ignore
                req.session.is2FAEnabled = true;
                res.json({ success: true, message: '2FA enabled successfully' });
            }
            else {
                res.status(400).json({ error: 'Invalid verification token' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async authenticate2FA(req, res) {
        try {
            const { token } = req.body;
            // @ts-ignore
            const userId = req.session.tempUserId || req.session.userId;
            const user = await AuthService_1.authService.getUserById(userId);
            if (AuthService_1.authService.verify2FA(token, user.twoFactorSecret)) {
                // @ts-ignore
                req.session.userId = user._id;
                // @ts-ignore
                req.session.userName = user.name;
                // @ts-ignore
                req.session.twoFactorVerified = true;
                // @ts-ignore
                req.session.is2FAEnabled = true;
                const jwtToken = AuthService_1.authService.generateToken(user, true);
                res.json({ message: '2FA verification successful', token: jwtToken, user });
            }
            else {
                res.status(400).json({ error: 'Invalid verification token' });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    getCurrentUser(req, res) {
        // @ts-ignore
        if (req.session.userId) {
            res.json({
                // @ts-ignore
                userId: req.session.userId,
                // @ts-ignore
                userName: req.session.userName,
                // @ts-ignore
                twoFactorVerified: req.session.twoFactorVerified
            });
        }
        else {
            res.status(401).json({ error: 'Not authenticated' });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
