import express, { Application } from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import itemRoutes from './routes/itemRoutes';

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
    }

    private routes(): void {
        this.app.use('/', itemRoutes);
    }
}

export default new App().app;
