import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export class SocketService {
    private io: Server;

    constructor(server: HttpServer) {
        this.io = new Server(server, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

        this.setupEvents();
    }

    private setupEvents() {
        this.io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('join', (documentId: string) => {
                socket.join(documentId);
                console.log(`Socket ${socket.id} joined room ${documentId}`);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
    }

    public emitDocumentUpdate(documentId: string, data: any) {
        this.io.to(documentId).emit('documentUpdate', data);
    }

    public getIO(): Server {
        return this.io;
    }
}

let socketService: SocketService;

export const initSocket = (server: HttpServer) => {
    socketService = new SocketService(server);
    return socketService;
};

export const getSocketService = () => socketService;
