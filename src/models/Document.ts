import mongoose, { Schema, Document } from 'mongoose';

export enum DocumentStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    PROCESSED = 'processed',
    ERROR = 'error'
}

export interface IDocument extends Document {
    userId: mongoose.Types.ObjectId;
    originalName: string;
    mimeType: string;
    size: number;
    minioObjectName: string;
    status: DocumentStatus;
    title?: string;
    tags?: string[];
    category?: string;
    description?: string;
    thumbnailUrl?: string;
    structuredData?: any;
    error?: string;
    createdAt: Date;
    updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    minioObjectName: { type: String, required: true },
    status: { type: String, enum: Object.values(DocumentStatus), default: DocumentStatus.PENDING },
    title: { type: String },
    tags: [{ type: String }],
    category: { type: String },
    description: { type: String },
    thumbnailUrl: { type: String },
    structuredData: { type: Schema.Types.Mixed },
    error: { type: String },
}, { timestamps: true });

export default mongoose.model<IDocument>('Document', DocumentSchema);
