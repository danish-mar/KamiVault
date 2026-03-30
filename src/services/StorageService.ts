import * as Minio from 'minio';
import dotenv from 'dotenv';

dotenv.config();

class StorageService {
    private client: Minio.Client;
    private bucketName: string = process.env.MINIO_BUCKET || 'documents';

    constructor() {
        this.client = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
            port: parseInt(process.env.MINIO_PORT || '9000'),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY || '',
            secretKey: process.env.MINIO_SECRET_KEY || ''
        });

        this.ensureBucketExists();
    }

    private async ensureBucketExists() {
        const maxRetries = 5;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const exists = await this.client.bucketExists(this.bucketName);
                if (!exists) {
                    await this.client.makeBucket(this.bucketName, 'us-east-1');
                    console.log(`✅ Bucket "${this.bucketName}" created successfully.`);
                } else {
                    console.log(`✅ Bucket "${this.bucketName}" already exists.`);
                }
                return; // Success
            } catch (error: any) {
                attempt++;
                console.warn(`⚠️ MinIO initialization attempt ${attempt} failed: ${error.message}`);
                if (attempt >= maxRetries) {
                    console.error('❌ Failed to initialize MinIO after maximum retries');
                    // In a real app, you might want to throw or exit here
                } else {
                    // Wait 2 seconds before retrying
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }
    }

    async uploadFile(objectName: string, filePath: string, metaData: any): Promise<void> {
        await this.client.fPutObject(this.bucketName, objectName, filePath, metaData);
    }

    async getPresignedUrl(objectName: string): Promise<string> {
        return await this.client.presignedGetObject(this.bucketName, objectName, 24 * 60 * 60);
    }

    async deleteFile(objectName: string): Promise<void> {
        await this.client.removeObject(this.bucketName, objectName);
    }
}

export const storageService = new StorageService();
