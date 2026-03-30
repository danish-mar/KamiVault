import { Router } from 'express';
import { authController } from '../controllers/AuthController';

const router = Router();

router.post('/login', (req, res) => authController.handleLogin(req, res));
router.post('/signup', (req, res) => authController.handleSignup(req, res));
router.get('/logout', (req, res) => {
    // @ts-ignore
    req.session.destroy();
    res.redirect('/login');
});
router.get('/me', (req, res) => authController.getCurrentUser(req, res));

// 2FA Routes
router.get('/2fa/setup', (req, res) => authController.setup2FA(req, res));
router.post('/2fa/verify-setup', (req, res) => authController.verify2FASetup(req, res));
router.post('/2fa/authenticate', (req, res) => authController.authenticate2FA(req, res));

export default router;
