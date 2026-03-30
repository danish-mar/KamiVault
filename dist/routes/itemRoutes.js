"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemController_1 = require("../controllers/ItemController");
const router = (0, express_1.Router)();
router.get('/', (req, res) => ItemController_1.itemController.renderHome(req, res));
router.get('/vault', (req, res) => ItemController_1.itemController.renderVault(req, res));
router.get('/settings', (req, res) => ItemController_1.itemController.renderSettings(req, res));
exports.default = router;
