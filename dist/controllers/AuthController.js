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
            await AuthService_1.authService.register({ name, email, password });
            res.redirect('/login');
        }
        catch (error) {
            res.render('signup', { error: error.message });
        }
    }
    async handleLogin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthService_1.authService.login(email, password);
            if (!user) {
                return res.render('login', { error: 'Invalid email or password' });
            }
            // @ts-ignore
            req.session.userId = user._id;
            // @ts-ignore
            req.session.userName = user.name;
            res.redirect('/');
        }
        catch (error) {
            res.render('login', { error: error.message });
        }
    }
    handleLogout(req, res) {
        req.session.destroy((err) => {
            if (err)
                console.error(err);
            res.redirect('/');
        });
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
