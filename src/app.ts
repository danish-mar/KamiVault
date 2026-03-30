import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';

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
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        // Session configuration
        this.app.use(session({
            secret: 'kamivault-secret-key', // Use .env in production
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false } // Set to true if using HTTPS
        }));

        // Provide session data to all views
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            // @ts-ignore
            res.locals.userId = req.session.userId || null;
            // @ts-ignore
            res.locals.userName = req.session.userName || null;
            next();
        });
    }

    private routes(): void {
        this.app.use('/', itemRoutes);
        this.app.use('/', authRoutes);
    }
}

export default new App().app;
