import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import { DocumentStatus, default as DocumentModel } from '../models/Document';
import { storageService } from './StorageService';
import { getSocketService } from './SocketService';

export class DocumentService {
    async createDocument(userId: string, file: Express.Multer.File) {
        const objectName = `${userId}/${Date.now()}-${file.originalname}`;
        
        // Upload to MinIO (for persistence/history)
        await storageService.uploadFile(objectName, file.path, {
            'Content-Type': file.mimetype,
            'Original-Name': file.originalname
        });

        // Save to MongoDB
        const document = new DocumentModel({
            userId,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            minioObjectName: objectName,
            status: DocumentStatus.PENDING
        });

        await document.save();

        // Notify FastAPI with the ACTUAL FILE (SRP)
        this.notifyProcessingService(document._id.toString(), file.path, file.originalname);

        return document;
    }

    private async notifyProcessingService(documentId: string, filePath: string, fileName: string) {
        try {
            const formData = new FormData();
            formData.append('file', fs.createReadStream(filePath), fileName);
    formData.append('instructions', 'Analyze this document. Identify if it is an Indian National Document (Aadhaar Card, PAN Card, Voter ID, or Driving License). Extract the document type as "doc_type". Extract specific fields like Name, ID Number, DOB, Gender, and Father Name into the "metadata" object. Also provide a professional title, classify into a category, and a 1-sentence description.');
    formData.append('example_json', '{"title": "", "category": "", "description": "", "tags": [], "doc_type": "aadhaar|pan|voter_id|dl|generic", "metadata": {"name": "", "id_number": "", "dob": "", "gender": "", "father_name": "", "dl_no": "", "pan_no": "", "aadhaar_no": "", "epic_no": ""}}');

            // Set status to processing
            await DocumentModel.findByIdAndUpdate(documentId, { status: DocumentStatus.PROCESSING });

            // Call Python service
            const response = await axios.post('http://localhost:8001/process', formData, {
                headers: { ...formData.getHeaders() }
            });
            
            const result = response.data;
            if (result.success) {
                const ai = result.data;
                await DocumentModel.findByIdAndUpdate(documentId, {
                    status: DocumentStatus.PROCESSED,
                    title: ai.title || undefined,
                    category: ai.category || 'Other',
                    tags: ai.tags || [],
                    description: ai.description || '',
                    structuredData: ai,
                    thumbnailUrl: result.thumbnail ? `data:image/jpeg;base64,${result.thumbnail}` : undefined
                });
                
                // Notify UI via Socket.io
                const socketService = getSocketService();
                if (socketService) {
                    socketService.emitDocumentUpdate(documentId, {
                        status: DocumentStatus.PROCESSED,
                        document: await DocumentModel.findById(documentId)
                    });
                }
            } else {
                throw new Error(result.error || 'Extraction failed');
            }
        } catch (error: any) {
            console.error('Failed to process document:', error.message);
            await DocumentModel.findByIdAndUpdate(documentId, { 
                status: DocumentStatus.ERROR,
                error: error.message
            });
            
            // Notify UI of error
            const socketService = getSocketService();
            if (socketService) {
                socketService.emitDocumentUpdate(documentId, {
                    status: DocumentStatus.ERROR,
                    error: error.message
                });
            }
        }
    }

    async updateDocumentResult(documentId: string, structuredData: any) {
        return await DocumentModel.findByIdAndUpdate(documentId, {
            status: DocumentStatus.PROCESSED,
            structuredData
        }, { new: true });
    }

    async getDocuments(userId: string) {
        return await DocumentModel.find({ userId }).sort({ createdAt: -1 });
    }

    async getDocument(documentId: string, userId: string) {
        return await DocumentModel.findOne({ _id: documentId, userId });
    }

    async getDownloadUrl(documentId: string, userId: string): Promise<string> {
        const document = await DocumentModel.findOne({ _id: documentId, userId });
        if (!document) throw new Error('Document not found');

        return await storageService.getPresignedUrl(document.minioObjectName);
    }

    async deleteDocument(documentId: string, userId: string): Promise<void> {
        const document = await DocumentModel.findOne({ _id: documentId, userId });
        if (!document) throw new Error('Document not found');

        // Delete from MinIO
        await storageService.deleteFile(document.minioObjectName);

        // Delete from MongoDB
        await DocumentModel.deleteOne({ _id: documentId });
    }

    async updateMetadata(documentId: string, userId: string, metadata: { title?: string, tags?: string[], category?: string }) {
        return await DocumentModel.findOneAndUpdate(
            { _id: documentId, userId },
            { $set: metadata },
            { new: true }
        );
    }
}

export const documentService = new DocumentService();
