import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import documentRoutes from './routes/documentRoutes';
import { itemController } from './controllers/ItemController';
import { authController } from './controllers/AuthController';
import { documentController } from './controllers/DocumentController';
import { authMiddleware } from './middlewares/AuthMiddleware';

export class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        // Set EJS as view engine
        this.app.use(expressLayouts);
        this.app.set('layout', 'layout');
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));

        // Middleware
        this.app.use(cors({
            origin: 'http://localhost:5173', // Vite default port
            credentials: true
        }));
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        // Session configuration
        this.app.use(session({
            secret: 'kamivault-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: { 
                secure: false, // Set to true if using HTTPS
                httpOnly: true,
                sameSite: 'lax'
            }
        }));

        // Provide session data to all views
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            // @ts-ignore
            res.locals.userId = req.session.userId || null;
            // @ts-ignore
            res.locals.userName = req.session.userName || null;
            // @ts-ignore
            res.locals.twoFactorVerified = req.session.twoFactorVerified || false;
            next();
        });
    }

    private routes(): void {
        // API Routes
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/items', authMiddleware, itemRoutes);
        this.app.use('/api/documents', authMiddleware, documentRoutes);
        
        // EJS View Routes
        this.app.get('/', (req, res) => itemController.renderHome(req, res));
        this.app.get('/login', (req, res) => authController.renderLogin(req, res));
        this.app.get('/signup', (req, res) => authController.renderSignup(req, res));
        
        // 2FA Flow Views
        this.app.get('/setup-2fa', (req, res) => {
            // @ts-ignore
            if (!req.session.userId) return res.redirect('/login');
            res.render('2fa-setup');
        });
        this.app.get('/verify-2fa', (req, res) => {
            // @ts-ignore
            if (!req.session.userId && !req.session.tempUserId) return res.redirect('/login');
            res.render('2fa-verify');
        });

        this.app.get('/vault', authMiddleware, (req, res) => documentController.renderVault(req, res));
        this.app.get('/settings', authMiddleware, (req, res) => itemController.renderSettings(req, res));
        this.app.get('/logout', (req, res) => {
            // @ts-ignore
            req.session.destroy();
            res.redirect('/');
        });
    }
}

export default new App().app;
