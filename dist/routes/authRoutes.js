"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => AuthController_1.authController.handleLogin(req, res));
router.post('/signup', (req, res) => AuthController_1.authController.handleSignup(req, res));
router.get('/logout', (req, res) => {
    // @ts-ignore
    req.session.destroy();
    res.redirect('/login');
});
router.get('/me', (req, res) => AuthController_1.authController.getCurrentUser(req, res));
// 2FA Routes
router.get('/2fa/setup', (req, res) => AuthController_1.authController.setup2FA(req, res));
router.post('/2fa/verify-setup', (req, res) => AuthController_1.authController.verify2FASetup(req, res));
router.post('/2fa/authenticate', (req, res) => AuthController_1.authController.authenticate2FA(req, res));
exports.default = router;
