"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
const ItemController_1 = require("./controllers/ItemController");
const AuthController_1 = require("./controllers/AuthController");
const DocumentController_1 = require("./controllers/DocumentController");
const AuthMiddleware_1 = require("./middlewares/AuthMiddleware");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        // Set EJS as view engine
        this.app.use(express_ejs_layouts_1.default);
        this.app.set('layout', 'layout');
        this.app.set('view engine', 'ejs');
        this.app.set('views', path_1.default.join(__dirname, '../views'));
        // Middleware
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:5173', // Vite default port
            credentials: true
        }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        // Session configuration
        this.app.use((0, express_session_1.default)({
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
        this.app.use((req, res, next) => {
            // @ts-ignore
            res.locals.userId = req.session.userId || null;
            // @ts-ignore
            res.locals.userName = req.session.userName || null;
            // @ts-ignore
            res.locals.twoFactorVerified = req.session.twoFactorVerified || false;
            next();
        });
    }
    routes() {
        // API Routes
        this.app.use('/api/auth', authRoutes_1.default);
        this.app.use('/api/items', AuthMiddleware_1.authMiddleware, itemRoutes_1.default);
        this.app.use('/api/documents', AuthMiddleware_1.authMiddleware, documentRoutes_1.default);
        // EJS View Routes
        this.app.get('/', (req, res) => ItemController_1.itemController.renderHome(req, res));
        this.app.get('/login', (req, res) => AuthController_1.authController.renderLogin(req, res));
        this.app.get('/signup', (req, res) => AuthController_1.authController.renderSignup(req, res));
        // 2FA Flow Views
        this.app.get('/setup-2fa', (req, res) => {
            // @ts-ignore
            if (!req.session.userId)
                return res.redirect('/login');
            res.render('2fa-setup');
        });
        this.app.get('/verify-2fa', (req, res) => {
            // @ts-ignore
            if (!req.session.userId && !req.session.tempUserId)
                return res.redirect('/login');
            res.render('2fa-verify');
        });
        this.app.get('/vault', AuthMiddleware_1.authMiddleware, (req, res) => DocumentController_1.documentController.renderVault(req, res));
        this.app.get('/settings', AuthMiddleware_1.authMiddleware, (req, res) => ItemController_1.itemController.renderSettings(req, res));
        this.app.get('/logout', (req, res) => {
            // @ts-ignore
            req.session.destroy();
            res.redirect('/');
        });
    }
}
exports.App = App;
exports.default = new App().app;
