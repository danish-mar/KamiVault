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
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async renderVault(req, res) {
        try {
            const items = await ItemService_1.itemService.getAllItems();
            res.render('vault', { items });
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async renderSettings(req, res) {
        res.render('settings');
    }
}
exports.ItemController = ItemController;
exports.itemController = new ItemController();
