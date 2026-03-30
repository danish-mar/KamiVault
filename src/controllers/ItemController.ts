import { Request, Response } from 'express';
import { itemService } from '../services/ItemService';

export class ItemController {
    async renderHome(req: Request, res: Response) {
        try {
            const items = await itemService.getRecentItems(3);
            res.render('index', { items });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async renderVault(req: Request, res: Response) {
        try {
            const items = await itemService.getAllItems();
            res.render('vault', { items });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async renderSettings(req: Request, res: Response) {
        res.render('settings');
    }
}

export const itemController = new ItemController();
