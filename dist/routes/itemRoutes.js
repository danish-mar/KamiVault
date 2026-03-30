"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemController_1 = require("../controllers/ItemController");
const router = (0, express_1.Router)();
router.get('/', (req, res) => ItemController_1.itemController.getAllItems(req, res));
router.get('/recent', (req, res) => ItemController_1.itemController.getRecentItems(req, res));
exports.default = router;
