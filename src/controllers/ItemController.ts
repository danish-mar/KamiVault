import { Request, Response } from 'express';
import { itemService } from '../services/ItemService';

export class ItemController {
    async renderHome(req: Request, res: Response) {
        try {
            const items = await itemService.getRecentItems(3);
            res.render('index', { items });
        } catch (error: any) {
            res.status(500).render('index', { items: [], error: error.message });
        }
    }

    renderSettings(req: Request, res: Response) {
        res.render('settings');
    }

    async getAllItems(req: Request, res: Response) {
        try {
            const items = await itemService.getAllItems();
            res.json(items);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRecentItems(req: Request, res: Response) {
        try {
            const count = parseInt(req.query.count as string) || 3;
            const items = await itemService.getRecentItems(count);
            res.json(items);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const itemController = new ItemController();
