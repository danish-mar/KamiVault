import Item, { IItem } from '../models/Item';

export class ItemService {
    async getAllItems(): Promise<IItem[]> {
        return await Item.find().sort({ createdAt: -1 });
    }

    async getRecentItems(limit: number = 3): Promise<IItem[]> {
        return await Item.find().sort({ createdAt: -1 }).limit(limit);
    }

    async createItem(data: Partial<IItem>): Promise<IItem> {
        const item = new Item(data);
        return await item.save();
    }
}

export const itemService = new ItemService();
