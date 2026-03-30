import { Router } from 'express';
import { authController } from '../controllers/AuthController';

const router = Router();

router.get('/login', (req, res) => authController.renderLogin(req, res));
router.post('/login', (req, res) => authController.handleLogin(req, res));

router.get('/signup', (req, res) => authController.renderSignup(req, res));
router.post('/signup', (req, res) => authController.handleSignup(req, res));

router.get('/logout', (req, res) => authController.handleLogout(req, res));

export default router;
