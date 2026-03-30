import { Router } from 'express';
import { itemController } from '../controllers/ItemController';

const router = Router();

router.get('/', (req, res) => itemController.getAllItems(req, res));
router.get('/recent', (req, res) => itemController.getRecentItems(req, res));

export default router;
