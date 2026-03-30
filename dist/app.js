"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const express_session_1 = __importDefault(require("express-session"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
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
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        // Session configuration
        this.app.use((0, express_session_1.default)({
            secret: 'kamivault-secret-key', // Use .env in production
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false } // Set to true if using HTTPS
        }));
        // Provide session data to all views
        this.app.use((req, res, next) => {
            // @ts-ignore
            res.locals.userId = req.session.userId || null;
            // @ts-ignore
            res.locals.userName = req.session.userName || null;
            next();
        });
    }
    routes() {
        this.app.use('/', itemRoutes_1.default);
        this.app.use('/', authRoutes_1.default);
    }
}
exports.App = App;
exports.default = new App().app;
