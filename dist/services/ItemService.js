"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemService = exports.ItemService = void 0;
const Item_1 = __importDefault(require("../models/Item"));
class ItemService {
    async getAllItems() {
        return await Item_1.default.find().sort({ createdAt: -1 });
    }
    async getRecentItems(limit = 3) {
        return await Item_1.default.find().sort({ createdAt: -1 }).limit(limit);
    }
    async createItem(data) {
        const item = new Item_1.default(data);
        return await item.save();
    }
}
exports.ItemService = ItemService;
exports.itemService = new ItemService();
