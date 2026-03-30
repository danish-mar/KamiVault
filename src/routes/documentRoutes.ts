import { Router } from 'express';
import multer from 'multer';
import { documentController } from '../controllers/DocumentController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import path from 'path';

const router = Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp'); // Temporary storage before moving to MinIO
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.png', '.jpg', '.jpeg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and images are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Routes
router.post('/upload', authMiddleware, upload.single('document'), (req, res) => documentController.upload(req, res));
router.get('/list', authMiddleware, (req, res) => documentController.list(req, res));
router.get('/:id', authMiddleware, (req, res) => documentController.show(req, res));
router.get('/:id/download', authMiddleware, (req, res) => documentController.download(req, res));
router.delete('/:id', authMiddleware, (req, res) => documentController.delete(req, res));
router.patch('/:id/metadata', authMiddleware, (req, res) => documentController.updateMetadata(req, res));
router.post('/webhook', (req, res) => documentController.handleWebhook(req, res));

export default router;
