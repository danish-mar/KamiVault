import { Router } from 'express';
import { itemController } from '../controllers/ItemController';

const router = Router();

router.get('/', (req, res) => itemController.renderHome(req, res));
router.get('/vault', (req, res) => itemController.renderVault(req, res));
router.get('/settings', (req, res) => itemController.renderSettings(req, res));

export default router;
