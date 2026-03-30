import { Request, Response } from 'express';
import { authService } from '../services/AuthService';

export class AuthController {
    renderLogin(req: Request, res: Response) {
        res.render('login', { error: null });
    }

    renderSignup(req: Request, res: Response) {
        res.render('signup', { error: null });
    }

    async handleSignup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            await authService.register({ name, email, password });
            res.redirect('/login');
        } catch (error: any) {
            res.render('signup', { error: error.message });
        }
    }

    async handleLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            if (!user) {
                return res.render('login', { error: 'Invalid email or password' });
            }
            // @ts-ignore
            req.session.userId = user._id;
            // @ts-ignore
            req.session.userName = user.name;
            res.redirect('/');
        } catch (error: any) {
            res.render('login', { error: error.message });
        }
    }

    handleLogout(req: Request, res: Response) {
        req.session.destroy((err) => {
            if (err) console.error(err);
            res.redirect('/');
        });
    }
}

export const authController = new AuthController();
