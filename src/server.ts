import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import app from './app';
import { initSocket } from './services/SocketService';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kamivault';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        
        const server = http.createServer(app);
        
        // Initialize Socket.io
        initSocket(server);

        server.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Could not connect to MongoDB', err);
        process.exit(1);
    });
