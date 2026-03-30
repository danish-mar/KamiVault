"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const SocketService_1 = require("./services/SocketService");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kamivault';
// Connect to MongoDB
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('✅ Connected to MongoDB');
    const server = http_1.default.createServer(app_1.default);
    // Initialize Socket.io
    (0, SocketService_1.initSocket)(server);
    server.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error('❌ Could not connect to MongoDB', err);
    process.exit(1);
});
