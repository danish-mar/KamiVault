"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemController = exports.ItemController = void 0;
const ItemService_1 = require("../services/ItemService");
class ItemController {
    async renderHome(req, res) {
        try {
            const items = await ItemService_1.itemService.getRecentItems(3);
            res.render('index', { items });
        }
        catch (error) {
            res.status(500).render('index', { items: [], error: error.message });
        }
    }
    renderSettings(req, res) {
        res.render('settings');
    }
    async getAllItems(req, res) {
        try {
            const items = await ItemService_1.itemService.getAllItems();
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getRecentItems(req, res) {
        try {
            const count = parseInt(req.query.count) || 3;
            const items = await ItemService_1.itemService.getRecentItems(count);
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ItemController = ItemController;
exports.itemController = new ItemController();
