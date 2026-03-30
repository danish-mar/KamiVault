import { Request, Response } from 'express';
import { documentService } from '../services/DocumentService';
import { getSocketService } from '../services/SocketService';

export class DocumentController {
    async renderVault(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.session.userId;
            if (!userId) return res.redirect('/login');
            const documents = await documentService.getDocuments(userId);
            res.render('vault', { documents });
        } catch (error: any) {
            res.status(500).render('vault', { documents: [], error: error.message });
        }
    }

    async upload(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // @ts-ignore
            const userId = req.user.id;
            const document = await documentService.createDocument(userId, req.file);
            
            res.status(201).json({
                message: 'Document uploaded and processing started',
                document
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async download(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { id } = req.params;
            const url = await documentService.getDownloadUrl(id as string, userId as string);
            res.json({ url });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id as string;
            const documents = await documentService.getDocuments(userId);
            res.json(documents);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { id } = req.params;
            const document = await documentService.getDocument(id as string, userId as string);
            if (!document) return res.status(404).json({ error: 'Document not found' });
            res.json(document);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async handleWebhook(req: Request, res: Response) {
        try {
            const { documentId, structuredData, error } = req.body;
            
            if (error) {
                res.json({ message: 'Error received' });
            } else {
                const doc = await documentService.updateDocumentResult(documentId, structuredData);
                
                // Emit socket event for real-time update
                const socketService = getSocketService();
                if (socketService) {
                    socketService.emitDocumentUpdate(documentId, {
                        status: 'processed',
                        document: doc
                    });
                }
                
                res.json({ message: 'Document updated successfully', document: doc });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { id } = req.params;
            await documentService.deleteDocument(id as string, userId as string);
            res.json({ message: 'Document deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMetadata(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { id } = req.params;
            const { title, tags, category } = req.body;
            const document = await documentService.updateMetadata(id as string, userId as string, { title, tags, category });
            res.json({ message: 'Metadata updated successfully', document });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const documentController = new DocumentController();
